"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendeePosition1639375723331 = void 0;
class attendeePosition1639375723331 {
    constructor() {
        this.name = 'attendeePosition1639375723331';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD "position" integer NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP COLUMN "position"`);
    }
}
exports.attendeePosition1639375723331 = attendeePosition1639375723331;
//# sourceMappingURL=1639375723331-attendeePosition.js.map