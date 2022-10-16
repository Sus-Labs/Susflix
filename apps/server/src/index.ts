import dotenv from "dotenv";
import createServer from "./utils/server";
import log from "./utils/logger";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 8080;
const app = createServer();

const start = async (port: number) => {
    try {
        app.listen(port, () => {
            log.info(`Listening on http://0.0.0.0:${port}`);
            log.info(`Running in ${process.env.NODE_ENV} mode`);
        });
    } catch (error) {
        log.error(error);
        process.exit(1);
    }
};

start(PORT);
