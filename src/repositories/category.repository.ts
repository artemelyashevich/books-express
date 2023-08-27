import { pool } from '../database/index'
import { categoryDto } from '../dto/category.dto'


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
        return new Promise((resolve, reject) => {
            pool.query<categoryDto[]>(`SELECT * FROM category WHERE category.name = ?`,
                [
                    name
                ],
                (err: any, res: any) => {
                    if (err) reject(err)
                    else resolve(res[0])
                })
        })
    }

    public findAll(): Promise<categoryDto[]> {
        return new Promise((resolve, reject) => {
            pool.query<categoryDto[]>(`SELECT * FROM category`, (err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

    remove(id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            pool.query<any>(
                "DELETE FROM category WHERE category.id = ?",
                [id],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.affectedRows)
                }
            )
        })
    }
}