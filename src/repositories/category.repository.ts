import {pool} from '../database'
import {categoryDto} from '../dto/category.dto'
import {QueryError} from "mysql2";


export class CategoryRepository {

    public create(categoryDto: categoryDto): Promise<categoryDto> {
        pool.query(
            `INSERT INTO category (name) VALUES (?)`,
            [
                categoryDto.name
            ]
        )
        return this.findByName(categoryDto.name)
    }

    public findByName(name: string): Promise<categoryDto> {
        return new Promise((resolve, reject): void => {
            pool.query<categoryDto[]>(`SELECT * FROM category WHERE category.name = ?`,
                [
                    name
                ],
                (err: QueryError | null, res: any): void => {
                    if (err) reject(err)
                    else resolve(res[0])
                })
        })
    }

    public findAll(): Promise<categoryDto[]> {
        return new Promise((resolve, reject): void => {
            pool.query<categoryDto[]>(`SELECT * FROM category`, (err: QueryError | null, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

    remove(id: number): Promise<number> {
        return new Promise((resolve, reject): void => {
            pool.query<any>(
                "DELETE FROM category WHERE category.id = ?",
                [id],
                (err: QueryError | null, res): void => {
                    if (err) reject(err)
                    else resolve(res.affectedRows)
                }
            )
        })
    }
}