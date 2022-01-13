"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankDetails1642035526455 = void 0;
class bankDetails1642035526455 {
    constructor() {
        this.name = 'bankDetails1642035526455';
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
exports.bankDetails1642035526455 = bankDetails1642035526455;
//# sourceMappingURL=1642035526455-bankDetails.js.map