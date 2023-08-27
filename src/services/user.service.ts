import { TUserDto } from "../dto/user.dto"
import { UserRepository } from "../repositories/user.repository"

export class UserService{

    private userRepository: UserRepository

    constructor(){
        this.userRepository = new UserRepository()
    }

    async findAll(): Promise<TUserDto[]>{
        const result: TUserDto[] = await this.userRepository.findAll()
        return result
    }
}