import { RowDataPacket } from "mysql2"

export interface bookDto extends RowDataPacket {
    id?: number,
    title: string,
    author: string,
    description: string,
    count: number,
    price: number,
    genre_id: number | string
}