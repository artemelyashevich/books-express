import {TUserDto} from "../dto/user.dto"
import {UserRepository} from "../repositories/user.repository"

export class UserService{

    private userRepository: UserRepository

    constructor(){
        this.userRepository = new UserRepository()
    }

    async findAll(): Promise<TUserDto[]>{
        return await this.userRepository.findAll()
    }
}