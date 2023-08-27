import { RowDataPacket } from "mysql2";

export interface categoryDto extends RowDataPacket {
    id?: number,
    name: string
}