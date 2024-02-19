import {bookDto} from "../dto/book.dto"
import {orderDto} from "../dto/order.dto"
import {TUserDto} from "../dto/user.dto"
import {BookRepository} from "../repositories/book.repository"
import {OrderRepository} from "../repositories/order.repository"
import {UserRepository} from "../repositories/user.repository"
import {IError} from "../types/error.types"
import {HttpStatus} from "../utils/httpStatus"

export class OrderRService {

    private orderRepository: OrderRepository
    private userRepository: UserRepository
    private bookRepository: BookRepository

    constructor() {
        this.orderRepository = new OrderRepository()
        this.userRepository = new UserRepository()
        this.bookRepository = new BookRepository()
    }

    public async create(orderDto: orderDto): Promise<orderDto | IError> {
        const user: TUserDto = await this.userRepository.findUser(orderDto.person_email)
        console.log(user);
        if (!user) return HttpStatus(404, "User with such email doesn't exist!")
        const book: bookDto = await this.bookRepository.findByTitle(orderDto.book_title)
        console.log(book);
        
        if (!book) return HttpStatus(404, "Book with such title doesn't exist!")
        if (user.balance < book.price) return HttpStatus(400, "Insufficient funds")
        if (book.count > 0) {
            await this.userRepository.update({...user, balance:  user.balance - book.price})
            await this.bookRepository.update({...book, count: book.count - 1, category_id: book.genre_id})
            return await this.orderRepository.create(orderDto)
        }
        return HttpStatus(404, "Book with such title doesn't exist!")
    }
}