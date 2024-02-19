import {genreDto} from "../dto/genre.dto";
import {GenreRepository} from "../repositories/genre.repository";

export class GenreService {

    private genreRepository: GenreRepository

    constructor() {
        this.genreRepository = new GenreRepository()
    }

    public async findAll(): Promise<genreDto[]> {
        return await this.genreRepository.findAll()
    }

    public async create(genreDto: genreDto): Promise<genreDto> {
        return await this.genreRepository.create(genreDto)
    }
}