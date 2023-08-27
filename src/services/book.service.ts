import { bookDto } from "../dto/book.dto";
import { BookRepository } from "../repositories/book.repository";
import { IError } from "../types/error.types";
import { HttpStatus } from "../utils/httpStatus";


export class BookService {

    private bookRepository: BookRepository

    constructor() {
        this.bookRepository = new BookRepository()
    }

    public async findAll(): Promise<bookDto[]> {
        const result: bookDto[] = await this.bookRepository.findAll()
        return result
    }

    public async createNewBook(book: bookDto): Promise<bookDto | IError> {
        const b: bookDto = await this.bookRepository.findByTitle(book.title)
        if (b) return HttpStatus(400, "Such book already exists!")
        const result: bookDto = await this.bookRepository.create(book)
        return result
    }
}