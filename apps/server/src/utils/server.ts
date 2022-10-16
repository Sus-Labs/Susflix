import express, { Express, Response, Request, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { createClient } from "redis";
import logger from "./logger";

function createServer() {
    const server: Express = express();
    const client = createClient({ url: process.env.REDIS_URL });

    (async () => {
        await client.connect();
        logger.info("Connected to Redis Database");
    })();

    const limiter = rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        store: new RedisStore({
            sendCommand: (...args: string[]) => client.sendCommand(args),
        }),
    });

    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(helmet());
    server.use(
        cors({
            origin: process.env.HOST_URL,
        }),
    );
    server.use(limiter);
    server.set("trust proxy", 1);

    // server.use(`/${process.env.API_VERSION || "latest"}`, router);

    server.get("/health", (req: Request, res: Response) => {
        res.status(200).send({
            statusCode: 200,
            message: "Success",
            payload: {
                status: "healthy",
                uptime: process.uptime(),
                timestamp: Date.now(),
                environment: process.env.NODE_ENV,
                version: process.env.GIT_SHA,
            },
        });
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

export default createServer;
