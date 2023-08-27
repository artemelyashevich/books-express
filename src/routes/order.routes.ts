import { Router } from "express"
import OrderController from "../controllers/order.controller"
import checkAuth from "../middleware/checkAuth"

class OrderRoutes {
    private router: Router
    private controller: OrderController

    constructor(){
        this.router = Router()
        this.controller = new OrderController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {   
        this.router.post("/order", checkAuth, this.controller.create)
    }

    public get gRouter(): Router{
        return this.router
    }
}

export default new OrderRoutes().gRouter