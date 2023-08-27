import express, { Application } from "express"
import cors from "cors"
import Routes from "./routes"


export default class Server {
    constructor(app: Application) {
        this.config(app)
        new Routes(app)
    }

    private config(app: Application): void {
        app.use(cors());
        app.use(express.json());
    }
}