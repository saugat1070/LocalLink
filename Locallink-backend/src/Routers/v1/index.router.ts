import { Router } from "express";
import pingRouter from "../../modules/ping/ping.routes.js";
import authenticationRouter from "../../modules/Authentication/Authentication.routes.js";

const v1Router: Router = Router();

v1Router.use("/ping", pingRouter);
v1Router.use("/auth", authenticationRouter);

export default v1Router;