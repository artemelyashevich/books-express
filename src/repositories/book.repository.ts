import dotenv from 'dotenv'
import {pool} from '../database'
import {bookDto} from '../dto/book.dto'
import {QueryError} from "mysql2";


dotenv.config()

export class BookRepository {

    findAll(): Promise<bookDto[]> {
        return new Promise((resolve, reject): void => {
            pool.query<bookDto[]>('SELECT * FROM book', (err: QueryError | null, res: any): void => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

    create(book: bookDto): Promise<bookDto> {
        pool.query(
            `INSERT INTO book 
        (title, author, description, price, category_id, count) 
        VALUES (?, ?, ?, ?, ?, ?)`,
            [
                book.title,
                book.author,
                book.description,
                book.price,
                book.genre_id,
                book.count
            ]
        )
        return this.findByTitle(book.title)
    }

    findByTitle(title: string): Promise<bookDto> {
        return new Promise((resolve, reject): void => {
            pool.query<bookDto[]>(
                `SELECT * FROM book  WHERE book.title = ?`, [title], (err: QueryError | null, res: any): void => {
                    if (err) reject(err)
                    else resolve(res[0])
                })
        })
    }

    remove(id: number): Promise<number> {
        return new Promise((resolve, reject): void => {
            pool.query<any>(
                "DELETE FROM book WHERE book.id = ?",
                [id],
                (err: QueryError | null, res): void => {
                    if (err) reject(err)
                    else resolve(res.affectedRows)
                }
            )
        })
    }

    update(bookDto: bookDto): Promise<bookDto> {
        pool.query(
            `UPDATE book SET 
        title = ?, author = ?, description = ?, count = ?, category_id = ?, price = ?
        WHERE id = ?`,
            [
                bookDto.title,
                bookDto.author,
                bookDto.description,
                bookDto.count,
                bookDto.genre_id,
                bookDto.price,
                bookDto.id
            ]
        )
        return this.findByTitle(bookDto.title)
    }
}