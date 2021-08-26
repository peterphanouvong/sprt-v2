"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CascadeDeleteEvent1629948379664 = void 0;
class CascadeDeleteEvent1629948379664 {
    constructor() {
        this.name = 'CascadeDeleteEvent1629948379664';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406"`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406" FOREIGN KEY ("attendeeId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406"`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406" FOREIGN KEY ("attendeeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.CascadeDeleteEvent1629948379664 = CascadeDeleteEvent1629948379664;
//# sourceMappingURL=1629948379664-CascadeDeleteEvent.js.map