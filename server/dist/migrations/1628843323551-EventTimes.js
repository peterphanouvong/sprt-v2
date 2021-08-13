"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTimes1628843323551 = void 0;
class EventTimes1628843323551 {
    constructor() {
        this.name = 'EventTimes1628843323551';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "datetime"`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "startTime" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "endTime" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "datetime" TIMESTAMP NOT NULL`);
    }
}
exports.EventTimes1628843323551 = EventTimes1628843323551;
//# sourceMappingURL=1628843323551-EventTimes.js.map