"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullableBeemId1639777438397 = void 0;
class NullableBeemId1639777438397 {
    constructor() {
        this.name = 'NullableBeemId1639777438397';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" ALTER COLUMN "clubBeemId" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" ALTER COLUMN "clubBeemId" SET NOT NULL`);
    }
}
exports.NullableBeemId1639777438397 = NullableBeemId1639777438397;
//# sourceMappingURL=1639777438397-NullableBeemId.js.map