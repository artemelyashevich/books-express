import {Response, Request, NextFunction} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {UserRepository} from '../repositories/user.repository'
import {TUserDto} from '../dto/user.dto'

dotenv.config()

const userRepository: UserRepository = new UserRepository()

export default async (req: Request, res: Response, next: NextFunction) => {
    const token: string = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded: any = jwt.verify(token, String(process.env.TOKEN_SECRET))
            const user: TUserDto = await userRepository.findById(decoded.id)
            if (user.role_name === "Admin") {
                next()
            } else {
                return res.status(403).json({
                    message: 'Forbidden'
                })
            }
        } catch (err) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
}