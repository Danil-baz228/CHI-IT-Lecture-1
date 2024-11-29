"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ormconfig_1 = require("./ormconfig");
const UserController_1 = require("./UserController");

ormconfig_1.AppDataSource.initialize()
    .then(() => {
        const app = (0, routing_controllers_1.createExpressServer)({
            controllers: [UserController_1.UserController],
        });
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch((error) => console.error("Database connection error:", error));
