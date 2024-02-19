import { Router } from "express"
import AuthController from "../controllers/auth.controller"
import handleValidators, { signUpValidation, signInValidation } from "../utils/validation/auth.validation"


class AuthRoutes {
    private router: Router
    private controller: AuthController

    constructor() {
        this.router = Router()
        this.controller = new AuthController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post("/signup", handleValidators, signUpValidation, this.controller.signUp)
        this.router.post("/sign-in", handleValidators, signInValidation, this.controller.signIn)
        this.router.post("/refresh", this.controller.refreshToken)
    }

    public get gRouter(): Router {
        return this.router
    }
}

export default new AuthRoutes().gRouter