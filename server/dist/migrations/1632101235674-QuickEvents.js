"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickEvents1632101235674 = void 0;
class QuickEvents1632101235674 {
    constructor() {
        this.name = 'QuickEvents1632101235674';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" DROP COLUMN "users"`);
        await queryRunner.query(`ALTER TABLE "public"."quick_event" ADD "users" character varying NOT NULL DEFAULT '[]'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" DROP COLUMN "users"`);
        await queryRunner.query(`ALTER TABLE "public"."quick_event" ADD "users" jsonb NOT NULL DEFAULT '[]'`);
    }
}
exports.QuickEvents1632101235674 = QuickEvents1632101235674;
//# sourceMappingURL=1632101235674-QuickEvents.js.map