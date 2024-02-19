import { Request, Response } from "express"
import { UserService } from "../services/user.service"
import {TUserDto} from "../dto/user.dto";

const userService: UserService = new UserService();

export default class UserController {
    async findAll(req: Request, res: Response): Promise<void> {
        const result: TUserDto[] = await userService.findAll()
        res.status(200).json(result)
    }
}
