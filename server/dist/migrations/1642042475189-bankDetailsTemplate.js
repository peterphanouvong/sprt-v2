"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankDetailsTemplate1642042475189 = void 0;
class bankDetailsTemplate1642042475189 {
    constructor() {
        this.name = 'bankDetailsTemplate1642042475189';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD "bsb" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD "accountNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "bsb" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "accountNumber" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "accountNumber"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "bsb"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP COLUMN "accountNumber"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP COLUMN "bsb"`);
    }
}
exports.bankDetailsTemplate1642042475189 = bankDetailsTemplate1642042475189;
//# sourceMappingURL=1642042475189-bankDetailsTemplate.js.map