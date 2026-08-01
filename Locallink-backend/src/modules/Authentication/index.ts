import  AuthenticationService  from "./Authentication.service.js";
import AuthenticationController from "./Authentication.controller.js";

const authenticationService = new AuthenticationService();
const authenticationController = new AuthenticationController(authenticationService);

export { authenticationService, authenticationController };
