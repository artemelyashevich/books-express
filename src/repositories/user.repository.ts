import dotenv from 'dotenv'
import { pool } from '../database/index'
import { TUserSignUpDto } from '../dto/user.signUp.dto'
import { TUserDto } from '../dto/user.dto'



dotenv.config()

export class UserRepository {

    findAll(): Promise<TUserDto[]> {
        return new Promise((resolve, reject) => {
            pool.query<TUserDto[]>('SELECT person.id, person.first_name, person.email, person.balance, person.last_name, role.name as role_name FROM email.person JOIN email.role ON person.role_id = role.id;', (err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

    create(userSignUpDto: TUserSignUpDto): Promise<TUserDto> {
        pool.query(
            `INSERT INTO person 
        (first_name, last_name, email, password_hash, balance, role_id, refresh_token) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                userSignUpDto.first_name,
                userSignUpDto.last_name,
                userSignUpDto.email,
                userSignUpDto.password_hash,
                userSignUpDto.balance,
                userSignUpDto.role_id,
                userSignUpDto.refresh_token
            ]
        )
        return this.findByEmail(userSignUpDto.email)
    }

    update(userSignUpDto: TUserDto): Promise<TUserDto> {
        pool.query(
            `UPDATE person SET 
        first_name = ?, last_name = ?, email = ?, password_hash = ?, balance = ?, role_id = ?, refresh_token = ?
        WHERE id = ?`,
            [
                userSignUpDto.first_name,
                userSignUpDto.last_name,
                userSignUpDto.email,
                userSignUpDto.password_hash,
                userSignUpDto.balance,
                userSignUpDto.role_id,
                userSignUpDto.refresh_token,
                userSignUpDto.id
            ]
        )
        return this.findByEmail(userSignUpDto.email)
    }

    findById(id: number): Promise<TUserDto> {
        return new Promise((resolve, reject) => {
            pool.query<TUserDto[]>(
                `SELECT 
                person.id, person.first_name, person.email, person.balance, person.last_name, role.name as role_name 
                FROM person
                JOIN role 
                ON role.id = person.role_id
                WHERE person.id = ?`, [id], (err: any, res: any) => {
                if (err) reject(err)
                else resolve(res[0])
            })
        })
    }

    findByEmail(email: string): Promise<TUserDto> {
        return new Promise((resolve, reject) => {
            pool.query<TUserDto[]>(
                `SELECT person.id, person.first_name, person.email, person.balance, person.last_name, role.name as role_name FROM person  JOIN role ON role.id = person.role_id WHERE person.email = ?`, [email], (err: any, res: any) => {
                    if (err) reject(err)
                    else resolve(res[0])
                })
        })
    }

    findUser(email: string = '', id: Number = 0): Promise<TUserDto> {
        if (id == 0) {
            return new Promise((resolve, reject) => {
                pool.query<TUserDto[]>(
                    `SELECT * FROM person WHERE person.email = ?`, [email], (err: any, res: any) => {
                        if (err) reject(err)
                        else resolve(res[0])
                    })
            })
        }
        return new Promise((resolve, reject) => {
            pool.query<TUserDto[]>(
                `SELECT person.id, person.password_hash ,person.first_name, person.refresh_token, person.email, person.balance, person.last_name, role.name as role_name FROM person  JOIN role ON role.id = person.role_id WHERE person.id = ?`, [id], (err: any, res: any) => {
                    if (err) reject(err)
                    else resolve(res[0])
                })
        })
    }
}