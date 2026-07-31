import { Router } from "express";
import { PingService } from "./ping.service.js";
import PingRepository from "./ping.repository.js";
import PingController from "./ping.controller.js";

const pingRouter : Router = Router();

// module wiring
const pingRepository = new PingRepository();
const pingService = new PingService(pingRepository);
const pingController = new PingController(pingService);

// routes related with ping module
pingRouter.get("/", pingController.ping.bind(pingController));

export default pingRouter;