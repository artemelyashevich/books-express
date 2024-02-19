import {Request, Response} from "express"
import {AuthService} from "../services/auth.service"
import {RequestBody} from "../types/types"
import {TUserSignUpDto} from "../dto/user.signUp.dto"
import {TUserSignInDto} from "../dto/user.signIn.dto"
import {TUserDto} from "../dto/user.dto";
import {IError} from "../types/error.types";


const authService: AuthService = new AuthService()

export default class AuthController {
    async signUp(
        req: RequestBody<TUserSignUpDto>,
        res: Response
    ): Promise<void> {
        const result: TUserDto | IError = await authService.signUp(req.body)
        res.status(201).json(result)
    }

    async signIn(
        req: RequestBody<TUserSignInDto>,
        res: Response
    ): Promise<void> {
        const result: TUserDto | IError = await authService.signIn(req.body)
        res.status(200).json(result)
    }

    async refreshToken(
        req: RequestBody<{ email: string }>,
        res: Response
    ): Promise<void> {
        const result: {access_token: string} = await authService.refreshToken(req.body.email)
        res.status(201).json(result)
    }
}