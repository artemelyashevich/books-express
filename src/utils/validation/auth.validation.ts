import { body, validationResult } from "express-validator"
import {Request, Response, NextFunction} from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    next()
}

export const signUpVAlidation = [
    body('email', 'Invalid email format').isEmail(),
    body('first_name', 'First name must contain 2 characters').isLength({ min: 2 }),
    body('last_name', 'Last name must contain 2 characters').isLength({ min: 2 }),
    body('password', 'Password must contain 5 characters').isLength({ min: 5 })
]

export const signInVAlidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must contain 5 characters').isLength({ min: 5 })
]
