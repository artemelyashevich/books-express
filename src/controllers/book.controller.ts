import { BookService } from "../services/book.service"
import { Response, Request } from 'express'
import { RequestBody } from "../types/types"
import { bookDto } from "../dto/book.dto"


const bookService: BookService = new BookService()

export default class BookController {

    async findAll(req: Request, res: Response): Promise<void> {
        const result = await bookService.findAll()
        res.status(200).json(result)
    }

    async create(
        req: RequestBody<bookDto>,
        res: Response
    ): Promise<void> {
        const result = await bookService.createNewBook(req.body)
        res.status(200).json(result)
    }
}