import jwt from 'jsonwebtoken'


export default (session: number): string => {

    return jwt.sign(
        {
            session: session
        },
        String(process.env.REFRESH_TOKEN_SECRET),
        {
            expiresIn: String(process.env.REFRESH_TOKEN_LIFE)
        })
}