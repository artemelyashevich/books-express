import { RowDataPacket } from "mysql2";

export interface TUserDto extends RowDataPacket {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    role_id: number,
    password_hash?: string,
    balance: number,
    refresh_token?: string, 
    access_token?: string  
}