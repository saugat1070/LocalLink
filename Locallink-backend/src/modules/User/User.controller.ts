import { IUserService } from "./User.service.js";

export interface IUserController {

}

export class UserController implements IUserController {
    private userService: IUserService
    constructor(private user_service: IUserService){
        this.userService = user_service
    }
}