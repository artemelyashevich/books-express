import { Request, Response } from "express"
import { UserService } from "../services/user.service"

const userService: UserService = new UserService();

export default class UserController {
    async findAll(req: Request, res: Response) {
        const result = await userService.findAll()
        res.status(200).json(result)
    }
}
