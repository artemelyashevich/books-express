import {bookDto} from "../dto/book.dto";
import {BookRepository} from "../repositories/book.repository";
import {IError} from "../types/error.types";
import {HttpStatus} from "../utils/httpStatus";


export class BookService {

    private bookRepository: BookRepository

    constructor() {
        this.bookRepository = new BookRepository()
    }

    public async findAll(): Promise<bookDto[]> {
        return await this.bookRepository.findAll()
    }

    public async createNewBook(book: bookDto): Promise<bookDto | IError> {
        const b: bookDto = await this.bookRepository.findByTitle(book.title)
        if (b) return HttpStatus(400, "Such book already exists!")
        return await this.bookRepository.create(book)
    }
}