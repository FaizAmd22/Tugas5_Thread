import { AppDataSource } from "./data-source"
import * as express from "express"
import * as cors from "cors"
import routes from "./routes"
import "dotenv/config"

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        const PORT = process.env.PORT

        app.use(
            cors({
                credentials: true,
                origin: "http://localhost:5173",
                methods: ["GET", "POST", "PATCH", "DELETE"],
                allowedHeaders: ["Origin", "Content-Type", "Authorization", "Accept"],
                preflightContinue: true
            })
        )

        app.use(express.json())
        app.use("/api/v1", routes)

        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    })
    .catch(error => console.log(error))
