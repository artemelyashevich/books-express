import jwt from 'jsonwebtoken'
import { TUserDto } from '../dto/user.dto'


export default (user: TUserDto, session: number): string => {

    const token: string = jwt.sign(
        {
            id: user.id,
            session: session
        },
        String(process.env.TOKEN_SECRET),
        {
            expiresIn: String(process.env.TOKEN_LIFE)
        })
    return token
}