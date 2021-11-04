"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullableClubBeemId1635908520468 = void 0;
class nullableClubBeemId1635908520468 {
    constructor() {
        this.name = 'nullableClubBeemId1635908520468';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_template" ALTER COLUMN "clubBeemId" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_template" ALTER COLUMN "clubBeemId" SET NOT NULL`);
    }
}
exports.nullableClubBeemId1635908520468 = nullableClubBeemId1635908520468;
//# sourceMappingURL=1635908520468-nullable%20clubBeemId.js.map