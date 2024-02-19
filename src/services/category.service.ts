import {categoryDto} from "../dto/category.dto"
import {CategoryRepository} from "../repositories/category.repository"

export class CategoryService {

    private categoryRepository: CategoryRepository

    constructor() {
        this.categoryRepository = new CategoryRepository()
    }

    public async findAll(): Promise<categoryDto[]> {
        return await this.categoryRepository.findAll()
    }

    public async create(categoryDto: categoryDto): Promise<categoryDto> {
        return await this.categoryRepository.create(categoryDto)
    }

    public async findByName(name: string): Promise<categoryDto> {
        return await this.categoryRepository.findByName(name)
    }
} 