import { RowDataPacket } from "mysql2";

export interface genreDto extends RowDataPacket {
    id?: number,
    name: string,
    category_id: number | string
}