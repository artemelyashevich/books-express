import {pool} from '../database'
import {genreDto} from '../dto/genre.dto'
import {QueryError} from "mysql2";


export class GenreRepository {

    public create(genreDto: genreDto): Promise<genreDto> {
        pool.query(
            `INSERT INTO genre (name, category_id) VALUES (?, ?)`,
            [
                genreDto.name,
                genreDto.category_id
            ]
        )
        return this.findByName(genreDto.name)
    }

    public findByName(name: string): Promise<genreDto> {
        return new Promise((resolve, reject): void => {
            pool.query<genreDto[]>(
                `SELECT * FROM genre WHERE genre.name = ?`, [name],
                (err: QueryError | null, res: any): void => {
                    if (err) reject(err)
                    else resolve(res)
                })
        })
    }

    public findAll(): Promise<genreDto[]> {
        return new Promise((resolve, reject) => {
            pool.query<genreDto[]>(
                `SELECT genre.id, genre.name, category.name as cat FROM genre
                JOIN category 
                ON category.id = genre.category_id`,
                (err: QueryError | null, res: any): void => {
                    if (err) reject(err)
                    else resolve(res)
                })
        })
    }

    remove(id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            pool.query<any>(
                "DELETE FROM genre WHERE genre.id = ?",
                [id],
                (err: QueryError | null, res): void => {
                    if (err) reject(err)
                    else resolve(res.affectedRows)
                }
            )
        })
    }
}