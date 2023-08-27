import { Router } from "express"
import GenreController from "../controllers/genre.controller"
import checkAdmin from "../middleware/checkAdmin"

class GenreRoutes {
    private router: Router
    private controller: GenreController

    constructor(){
        this.router = Router()
        this.controller = new GenreController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {   
        this.router.get("/genre", this.controller.findAll)
        this.router.post("/genre", checkAdmin, this.controller.create)
    }

    public get gRouter(): Router{
        return this.router
    }
}

export default new GenreRoutes().gRouter