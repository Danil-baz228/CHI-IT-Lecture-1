"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1680000000000 = void 0;
const typeorm_1 = require("typeorm");

class InitialMigration1680000000000 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user" character varying NOT NULL,
                "email" character varying NOT NULL,
                PRIMARY KEY ("id")
            );
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "user";
        `);
    }
}
exports.InitialMigration1680000000000 = InitialMigration1680000000000;
