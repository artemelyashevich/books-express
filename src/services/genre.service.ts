import { genreDto } from "../dto/genre.dto";
import { GenreRepository } from "../repositories/genre.repository";

export class GenreService {

    private genreRepository: GenreRepository

    constructor() {
        this.genreRepository = new GenreRepository()
    }

    public async findAll(): Promise<genreDto[]> {
        const result: genreDto[] = await this.genreRepository.findAll()
        return result
    }

    public async create(genreDto: genreDto): Promise<genreDto> {
        const result: genreDto = await this.genreRepository.create(genreDto)
        return result
    }
}