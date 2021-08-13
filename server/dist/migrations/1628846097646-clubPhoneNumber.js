"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clubPhoneNumber1628846097646 = void 0;
class clubPhoneNumber1628846097646 {
    constructor() {
        this.name = 'clubPhoneNumber1628846097646';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."club" ALTER COLUMN "phoneNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`);
        await queryRunner.query(`ALTER TABLE "public"."club" ALTER COLUMN "phoneNumber" DROP NOT NULL`);
    }
}
exports.clubPhoneNumber1628846097646 = clubPhoneNumber1628846097646;
//# sourceMappingURL=1628846097646-clubPhoneNumber.js.map