"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reset1634946910451 = void 0;
class Reset1634946910451 {
    constructor() {
        this.name = 'Reset1634946910451';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME COLUMN "username" TO "clubName"`);
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" TO "UQ_36c25110ad321975de2c7e8eb65"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME CONSTRAINT "UQ_36c25110ad321975de2c7e8eb65" TO "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME COLUMN "clubName" TO "username"`);
    }
}
exports.Reset1634946910451 = Reset1634946910451;
//# sourceMappingURL=1634946910451-Reset.js.map