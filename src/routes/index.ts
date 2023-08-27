import { Application } from "express"
import userRoutes from "./user.routes"
import authRoutes from "./auth.routes"
import genreRoutes from "./genre.routes"
import categoryRoutes from "./category.routes"
import bookRoutes from "./book.routes"
import orderRoutes from "./order.routes"


export default class Routes {
    constructor(app: Application) {
        app.use
        (
            authRoutes,
            userRoutes,
            genreRoutes, 
            categoryRoutes,
            bookRoutes,
            orderRoutes
        )
    }
}