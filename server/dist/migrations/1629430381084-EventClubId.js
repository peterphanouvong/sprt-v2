"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventClubId1629430381084 = void 0;
class EventClubId1629430381084 {
    constructor() {
        this.name = 'EventClubId1629430381084';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "clubId" integer`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "clubId"`);
    }
}
exports.EventClubId1629430381084 = EventClubId1629430381084;
//# sourceMappingURL=1629430381084-EventClubId.js.map