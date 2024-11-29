import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "lesson13",      // Имя пользователя
    password: "password",      // Пароль пользователя
    database: "lesson13",      // Имя базы данных
    synchronize: false,        // Никогда не используйте true в продакшене
    logging: true,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
});
