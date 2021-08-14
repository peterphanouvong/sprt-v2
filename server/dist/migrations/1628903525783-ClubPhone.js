"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubPhone1628903525783 = void 0;
class ClubPhone1628903525783 {
    constructor() {
        this.name = 'ClubPhone1628903525783';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."club" ADD "phoneNumber" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."club" DROP COLUMN "phoneNumber"`);
    }
}
exports.ClubPhone1628903525783 = ClubPhone1628903525783;
//# sourceMappingURL=1628903525783-ClubPhone.js.map