import {TUserSignUpDto} from "../dto/user.signUp.dto"
import {UserRepository} from "../repositories/user.repository"
import CryptoJs from 'crypto-js'
import {TUserSignInDto} from "../dto/user.signIn.dto"
import {HttpStatus} from "../utils/httpStatus"
import token from "../utils/accessToken"
import refreshToken from "../utils/refreshToken"
import accessToken from "../utils/accessToken"
import {TUserDto} from "../dto/user.dto"
import {IError} from "../types/error.types"


export class AuthService {

    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    public async signUp(userSignUpDto: TUserSignUpDto): Promise<TUserDto | IError> {
        let u: TUserDto = await this.userRepository.findUser(userSignUpDto.email)
        if (u != null) return HttpStatus(404, "User with such email already exist!")
        const hash: string = CryptoJs
            .AES
            .encrypt(userSignUpDto.password_hash, String(process.env.CRYPTO_SECRET))
            .toString()
        const session: number = Math.random() * 1000
        await this.userRepository.create({...userSignUpDto, password_hash: hash, refresh_token: refreshToken(session)})
        const user: TUserDto = await this.userRepository.findByEmail(userSignUpDto.email)
        const {password_hash, refresh_token, ...userData} = user
        return {...userData, access_token: token(user, session)}
    }

    public async signIn(userSignInDto: TUserSignInDto): Promise<TUserDto | IError> {
        const user: TUserDto = await this.userRepository.findUser(userSignInDto.email)
        if (user == null) return HttpStatus(404, "User with such email doesn't exist!")
        const decPass: CryptoJs.lib.WordArray = CryptoJs.AES.decrypt(String(user.password_hash), String(process.env.CRYPTO_SECRET))
        const pass: string = decPass.toString(CryptoJs.enc.Utf8)
        if (pass != userSignInDto.password) return HttpStatus(400, "Incorrect password")
        const {password_hash, ...userData} = user
        const session: number = Math.random() * 1000
        return {...userData, access_token: token(user, session)}
    }

    async refreshToken(email: string) {
        const user: TUserDto = await this.userRepository.findByEmail(email)
        const session: number = Math.random() * 1000
        await this.userRepository.update({...user, refresh_token: refreshToken(session)})
        return {access_token: accessToken(user, session)}
    }
}