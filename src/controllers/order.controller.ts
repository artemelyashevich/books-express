import { orderDto } from "../dto/order.dto"
import { OrderRService } from "../services/order.service"
import { Response } from "express"
import { RequestBody } from "../types/types"
import {IError} from "../types/error.types";

const orderService: OrderRService = new OrderRService()

export default class OrderController {

    async create(req: RequestBody<orderDto>, res: Response): Promise<void> {
        const result: orderDto | IError = await orderService.create(req.body)
        res.status(201).json(result)
    }
}