import {Request, Response} from "express"
import {GenreService} from "../services/genre.service"
import {RequestBody} from "../types/types"
import {genreDto} from "../dto/genre.dto"


const genreService: GenreService = new GenreService()

export default class GenreController {

    async findAll(req: Request, res: Response): Promise<void> {
        const result: genreDto[] = await genreService.findAll()
        res.status(200).json(result)
    }

    async create(
        req: RequestBody<genreDto>,
        res: Response
    ): Promise<void> {
        const result: genreDto = await genreService.create(req.body)
        res.status(201).json(result)
    }
}