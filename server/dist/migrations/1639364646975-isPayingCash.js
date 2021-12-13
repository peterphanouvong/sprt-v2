"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPayingCash1639364646975 = void 0;
class isPayingCash1639364646975 {
    constructor() {
        this.name = 'isPayingCash1639364646975';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD "isPayingCash" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP CONSTRAINT "FK_b6c0725feb7060efaa371ce0299"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ALTER COLUMN "ownerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD CONSTRAINT "FK_b6c0725feb7060efaa371ce0299" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP CONSTRAINT "FK_b6c0725feb7060efaa371ce0299"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ALTER COLUMN "ownerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD CONSTRAINT "FK_b6c0725feb7060efaa371ce0299" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP COLUMN "isPayingCash"`);
    }
}
exports.isPayingCash1639364646975 = isPayingCash1639364646975;
//# sourceMappingURL=1639364646975-isPayingCash.js.map