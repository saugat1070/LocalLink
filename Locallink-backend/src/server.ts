import { app } from "./main.js";
import { Env } from "./config/env.config.js";
import { logger } from "./config/logger.config.js";
import { connectDB } from "./config/db.config.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketMiddleware } from "./middleware/socket.middleware.js";
import { socketMethod } from "./utils/socket/index.js";
const loadRequiredModules = async () => {
    await connectDB();
};

const serverOptions = {
    cors: {
        origin: "*",
        credentials: true,
    },
};

const startServer = async () => {
    const httpServer = createServer(app);
    const PORT = Env.PORT;
    // socket server
    const io = new Server(httpServer, serverOptions);
    // httpserver listen
    httpServer.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT} in ${Env.NODE_ENV} mode`);
    });
    // middleware for socket handshake
    io.use(socketMiddleware);

    io.on("connection", (socket) => logger.info(`socket connected: ${socket?.data?._id}`));
    // establish socket connection
    socketMethod(io);


    await loadRequiredModules();
};

startServer().catch((error: Error) => {
    logger.error("Error starting the server", { error: error.message });
    process.exit(1);
});
