import { RowDataPacket } from "mysql2";

export interface TUserSignUpDto extends RowDataPacket {
    id?: number,
    first_name: string,
    last_name: string,
    email: string,
    password_hash: string,
    balance: number,
    refresh_token: string,
    role_id: number
}