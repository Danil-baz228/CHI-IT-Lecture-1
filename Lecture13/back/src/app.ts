import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { AppDataSource } from "./ormconfig";
import { UserController } from "./controllers/UserController";

AppDataSource.initialize()
    .then(() => {
        const app = createExpressServer({
            controllers: [UserController],
        });
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch((error) => console.error("Database connection error:", error));
