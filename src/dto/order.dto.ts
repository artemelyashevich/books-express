import { RowDataPacket } from "mysql2";

export interface orderDto extends RowDataPacket {
    id?: number,
    person_email: string,
    book_title: string
}