import {Response, Request, NextFunction} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export default (req: Request, res: Response, next: NextFunction) => {
    const token: string = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, String(process.env.TOKEN_SECRET))
            next()
        } catch (err) {
            return  res.status(401).json({
                message: 'Unauthorized'
            })
        }
    } else {
       return  res.status(401).json({
            message: 'Unauthorized'
        })
    }
}