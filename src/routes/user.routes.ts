import { Router } from "express"
import UserController from "../controllers/user.controller"


class UserRoutes {
   
    private router: Router
    private controller: UserController

    constructor() {
        this.router = Router()
        this.controller = new UserController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {   
        this.router.get("/users", this.controller.findAll)
    }

    public get gRouter(): Router{
        return this.router
    }
}

export default new UserRoutes().gRouter