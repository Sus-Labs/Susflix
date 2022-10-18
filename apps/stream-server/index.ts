import express, { Express, Response, Request, NextFunction } from "express";
import os from "os";
import cluster from "cluster";
import dotenv from "dotenv";
import logger from "pino";
import dayjs from "dayjs";
import cors from "cors";
import fs from "fs";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 8080;
const CLUSTER_WORKER_SIZE = os.cpus().length;
const CHUNK_SIZE_IN_BYTES: number = 1000000;

const log = logger({
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});

function createServer() {
    const server: Express = express();

    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(
        cors({
            origin: process.env.HOST_URL,
        }),
    );
    server.set("trust proxy", 1);
    server.get("/health", (req: Request, res: Response) => {
        res.status(200).send({
            statusCode: 200,
            message: "Success",
            payload: {
                status: "OK",
                average_load: os.loadavg(),
                uptime: process.uptime(),
                timestamp: Date.now(),
                environment: process.env.NODE_ENV,
                version: process.env.COMMIT_SHA,
            },
        });
    });
    server.get("/stream", async (req: Request, res: Response) => {
        try {
            const range = req.headers.range;

            if (!range) {
                res.status(400).send({
                    statusCode: 400,
                    message: "Range was not provided",
                    payload: null,
                });
                return;
            }

            const contentId = req.query.contentId as string;
            const contentPath = `${process.env.ROOT_DIR}/${contentId}.mp4`;
            const contentSizeInBytes = fs.statSync(contentPath).size;
            const chunkStart = Number(range.replace(/\D/g, ""));
            const chunkEnd = Math.min(chunkStart + CHUNK_SIZE_IN_BYTES, contentSizeInBytes - 1);
            const contentLength = chunkEnd - chunkStart + 1;

            const headers = {
                "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${contentSizeInBytes}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/mp4",
            };

            res.writeHead(206, headers);

            const videoStream = fs.createReadStream(contentPath, {
                start: chunkStart,
                end: chunkEnd,
            });

            videoStream.pipe(res);
        } catch (error) {
            res.status(500).send({
                statusCode: 500,
                message: "Internal Server Error",
                payload: error,
            });
        }
    });
    server.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(500).send({
            statusCode: 500,
            message: "Internal Server Error",
            payload: null,
        });
    });
    server.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).send({
            statusCode: 404,
            message: "Not found",
            payload: null,
        });
    });

    return server;
}

const app = createServer();
const start = async (port: number) => {
    try {
        app.listen(port, () => {
            log.info(`Starting Stream server in ${process.env.NODE_ENV} mode`);
            log.info(`Listening on http://0.0.0.0:${port}`);
        });
    } catch (error) {
        log.error(error);
        process.exit(1);
    }
};

if (CLUSTER_WORKER_SIZE > 1) {
    if (cluster.isPrimary) {
        for (let i = 0; i < CLUSTER_WORKER_SIZE; i++) {
            cluster.fork();
        }

        cluster.on("exit", function (worker) {
            log.error("[WORKER]", worker.id, " has exited");
        });
    } else {
        start(PORT);
    }
} else {
    start(PORT);
}

cluster.on("exit", function (worker, code, signal) {
    log.error("[WORKER]", worker.id, "has exited with signal", signal);
    if (code !== 0 && !worker.exitedAfterDisconnect) {
        cluster.fork();
    }
});
