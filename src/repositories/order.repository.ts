import {pool} from '../database'
import {orderDto} from '../dto/order.dto'
import {QueryError} from "mysql2";

export class OrderRepository {

    public create(orderDto: orderDto): Promise<orderDto> {
        pool.query(
            `INSERT INTO email.order (person_email, book_title) VALUES (?, ?)`,
            [
                orderDto.person_email,
                orderDto.book_title
            ]
        )
        return this.findByEmail(orderDto.person_email)
    }

    public findByEmail(email: string): Promise<orderDto> {
        return new Promise((resolve, reject): void => {
            pool.query<orderDto[]>(
                `SELECT * FROM email.order WHERE order.person_email = ?`, [email],
                (err: QueryError | null, res: any): void => {
                    if (err) reject(err)
                    else resolve(res)
                })
        })
    }

}