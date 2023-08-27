import { Router } from "express"
import CategoryController from "../controllers/category.controller"
import checkAdmin from "../middleware/checkAdmin"

class CategoryRoutes {
    private router: Router
    private controller: CategoryController

    constructor(){
        this.router = Router()
        this.controller = new CategoryController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {   
        this.router.get("/category", this.controller.findAll)
        this.router.get("/category/:name", this.controller.findAll)
        this.router.post("/category", checkAdmin, this.controller.create)
    }

    public get gRouter(): Router{
        return this.router
    }
}

export default new CategoryRoutes().gRouter