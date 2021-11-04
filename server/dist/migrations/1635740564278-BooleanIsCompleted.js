"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanIsCompleted1635740564278 = void 0;
class BooleanIsCompleted1635740564278 {
    constructor() {
        this.name = 'BooleanIsCompleted1635740564278';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "isCompleted"`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "isCompleted" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "isCompleted"`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "isCompleted" character varying NOT NULL DEFAULT false`);
    }
}
exports.BooleanIsCompleted1635740564278 = BooleanIsCompleted1635740564278;
//# sourceMappingURL=1635740564278-BooleanIsCompleted.js.map