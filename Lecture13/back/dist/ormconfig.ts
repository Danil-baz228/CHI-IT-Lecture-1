"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");

exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "lesson13",
    password: "password",
    database: "lesson13",
    synchronize: false,
    logging: true,
    entities: ["dist/entities/*.js"],
    migrations: ["dist/migrations/*.js"],
    subscribers: [],
});
