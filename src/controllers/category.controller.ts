import { CategoryService } from "../services/category.service"
import { Response, Request } from 'express'
import { RequestBody, RequestParams } from "../types/types"
import { categoryDto } from "../dto/category.dto"


const categoryService: CategoryService = new CategoryService()

export default class CategoryController {

    async findAll(req: Request, res: Response): Promise<void> {
        const result = await categoryService.findAll()
        res.status(200).json(result)
    }

    async create(
        req: RequestBody<categoryDto>,
        res: Response
    ): Promise<void> {
        const result = await categoryService.create(req.body)
        res.status(201).json(result)
    }

    async findByName(
        req: RequestParams<{name: string}>,
        res: Response
    ): Promise<void> {
        const result = await categoryService.findByName(req.params.name)
        res.status(200).json(result)
    }
}