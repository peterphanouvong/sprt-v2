"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartEndTime1635739564005 = void 0;
class StartEndTime1635739564005 {
    constructor() {
        this.name = 'StartEndTime1635739564005';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "isCompleted" character varying NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "startTime" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "endTime" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "isCompleted"`);
    }
}
exports.StartEndTime1635739564005 = StartEndTime1635739564005;
//# sourceMappingURL=1635739564005-StartEndTime.js.map