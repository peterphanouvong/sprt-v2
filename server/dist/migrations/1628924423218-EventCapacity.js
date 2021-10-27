"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCapacity1628924423218 = void 0;
class EventCapacity1628924423218 {
    async up(queryRunner) {
        await queryRunner.query(`alter table "event" add column "capacity" integer;`);
    }
    async down(_) { }
}
exports.EventCapacity1628924423218 = EventCapacity1628924423218;
//# sourceMappingURL=1628924423218-EventCapacity.js.map