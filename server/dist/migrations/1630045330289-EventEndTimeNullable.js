"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEndTimeNullable1630045330289 = void 0;
class EventEndTimeNullable1630045330289 {
    constructor() {
        this.name = 'EventEndTimeNullable1630045330289';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" ALTER COLUMN "endTime" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" ALTER COLUMN "endTime" SET NOT NULL`);
    }
}
exports.EventEndTimeNullable1630045330289 = EventEndTimeNullable1630045330289;
//# sourceMappingURL=1630045330289-EventEndTimeNullable.js.map