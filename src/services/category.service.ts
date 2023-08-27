import { categoryDto } from "../dto/category.dto"
import { CategoryRepository } from "../repositories/category.repository"

export class CategoryService {

    private categoryRepository: CategoryRepository

    constructor() {
        this.categoryRepository = new CategoryRepository()
    }

    public async findAll(): Promise<categoryDto[]> {
        const result: categoryDto[] = await this.categoryRepository.findAll()
        return result
    }

    public async create(categoryDto: categoryDto): Promise<categoryDto> {
        const result: categoryDto = await this.categoryRepository.create(categoryDto)
        return result
    }

    public async findByName(name: string): Promise<categoryDto> {
        const result: categoryDto = await this.categoryRepository.findByName(name)
        return result
    }
} 