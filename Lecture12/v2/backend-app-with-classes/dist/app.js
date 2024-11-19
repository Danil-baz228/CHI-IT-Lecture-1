"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const UserController_1 = require("./UserController");
const app = (0, routing_controllers_1.createExpressServer)({
    controllers: [UserController_1.UserController],
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
