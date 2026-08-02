import { app } from "./main.js";
import { Env } from "./config/env.config.js";
import { logger } from "./config/logger.config.js";
import { connectDB } from "./config/db.config.js";
const loadRequiredModules = async ()=>{
    await connectDB();
}
const startServer = async ()=>{
    const PORT = Env.PORT;
    app.listen(PORT,()=>{
        logger.info(`Server is running on port ${PORT} in ${Env.NODE_ENV} mode`)
    })

    await loadRequiredModules();

}

startServer().catch((error: Error)=>{
    logger.error("Error starting the server", {error: error.message});
    process.exit(1);
})