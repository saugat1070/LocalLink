import { Router } from "express";
import pingRouter from "../../modules/ping/ping.routes.js";
import authenticationRouter from "../../modules/Authentication/Authentication.routes.js";
import { userRouter } from "../../modules/User/User.routes.js";

const v1Router: Router = Router();

v1Router.use("/ping", pingRouter);
v1Router.use("/auth", authenticationRouter);
v1Router.use("/user", userRouter);

export default v1Router;