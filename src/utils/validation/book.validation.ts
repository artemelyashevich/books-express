import { body, validationResult } from "express-validator"
import {Request, Response, NextFunction} from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    next()
}

export const createBookValidation = [
    body('title', 'Title name must contain 3 characters').isLength({ min: 3 }),
    body('Description', 'Description name must contain 5 characters').isLength({ min: 5 }),
    body('author', 'Author must contain 3 characters').isLength({ min: 3 })
]
