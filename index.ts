import express, { Application } from "express"
import Server from "./src/app"
import dotenv from "dotenv"

dotenv.config()

const app: Application = express()
const server: Server = new Server(app)
const PORT: number = Number(process.env.PORT)  || 8081

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))