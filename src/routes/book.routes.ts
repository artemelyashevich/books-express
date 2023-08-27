import { Router } from "express"
import BookController from "../controllers/book.controller"
import checkAdmin from "../middleware/checkAdmin"

class BookRoutes {
    private router: Router
    private controller: BookController

    constructor(){
        this.router = Router()
        this.controller = new BookController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {   
        this.router.get("/books", this.controller.findAll)
        this.router.post("/books", checkAdmin, this.controller.create)
    }

    public get gRouter(): Router{
        return this.router
    }
}

export default new BookRoutes().gRouter