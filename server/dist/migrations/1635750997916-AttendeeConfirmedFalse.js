"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendeeConfirmedFalse1635750997916 = void 0;
class AttendeeConfirmedFalse1635750997916 {
    constructor() {
        this.name = 'AttendeeConfirmedFalse1635750997916';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ALTER COLUMN "isConfirmed" SET DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ALTER COLUMN "isConfirmed" DROP DEFAULT`);
    }
}
exports.AttendeeConfirmedFalse1635750997916 = AttendeeConfirmedFalse1635750997916;
//# sourceMappingURL=1635750997916-AttendeeConfirmedFalse.js.map