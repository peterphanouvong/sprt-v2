"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendeeWork1635750708206 = void 0;
class AttendeeWork1635750708206 {
    constructor() {
        this.name = 'AttendeeWork1635750708206';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD "isConfimed" boolean NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP COLUMN "isConfimed"`);
    }
}
exports.AttendeeWork1635750708206 = AttendeeWork1635750708206;
//# sourceMappingURL=1635750708206-AttendeeWork.js.map