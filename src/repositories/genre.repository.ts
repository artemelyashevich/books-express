import { pool } from '../database/index'
import { genreDto } from '../dto/genre.dto'


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
        return new Promise((resolve, reject) => {
            pool.query<genreDto[]>(
                `SELECT * FROM genre WHERE genre.name = ?`, [name], (err: any, res: any) => {
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
                ON category.id = genre.category_id`, (err: any, res: any) => {
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
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.affectedRows)
                }
            )
        })
    }
}