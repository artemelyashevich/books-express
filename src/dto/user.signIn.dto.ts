import { RowDataPacket } from "mysql2";

export interface TUserSignInDto extends RowDataPacket {  
    email: string,
    password: string,
    refresh_token: string
}