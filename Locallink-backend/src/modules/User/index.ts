import { UserController } from "./User.controller.js";
import { UserService } from "./User.service.js";

const instanceUserService = new UserService();
const instanceUserController = new UserController(instanceUserService);

export { instanceUserService, instanceUserController };