"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickEvents1632100203125 = void 0;
class QuickEvents1632100203125 {
    constructor() {
        this.name = 'QuickEvents1632100203125';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "quick_event" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "capacity" integer, "users" jsonb NOT NULL DEFAULT '[]', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5195fe5e504a8df64b07281036e" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "quick_event"`);
    }
}
exports.QuickEvents1632100203125 = QuickEvents1632100203125;
//# sourceMappingURL=1632100203125-QuickEvents.js.map