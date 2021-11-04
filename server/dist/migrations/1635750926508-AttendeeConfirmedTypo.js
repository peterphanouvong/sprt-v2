"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendeeConfirmedTypo1635750926508 = void 0;
class AttendeeConfirmedTypo1635750926508 {
    constructor() {
        this.name = 'AttendeeConfirmedTypo1635750926508';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" RENAME COLUMN "isConfimed" TO "isConfirmed"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" RENAME COLUMN "isConfirmed" TO "isConfimed"`);
    }
}
exports.AttendeeConfirmedTypo1635750926508 = AttendeeConfirmedTypo1635750926508;
//# sourceMappingURL=1635750926508-AttendeeConfirmedTypo.js.map