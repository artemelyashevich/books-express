import {body, Result, ValidationChain, ValidationError, validationResult} from "express-validator"
import {Request, Response, NextFunction} from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    next()
}

export const signUpValidation: ValidationChain[] = [
    body('email', 'Invalid email format').isEmail(),
    body('first_name', 'First name must contain 2 characters').isLength({min: 2}),
    body('last_name', 'Last name must contain 2 characters').isLength({min: 2}),
    body('password', 'Password must contain 5 characters').isLength({min: 5})
]

export const signInValidation: ValidationChain[] = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must contain 5 characters').isLength({min: 5})
]
