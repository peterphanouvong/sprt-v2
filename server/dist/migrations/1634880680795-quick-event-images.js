"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickEventImages1634880680795 = void 0;
class quickEventImages1634880680795 {
    constructor() {
        this.name = 'quickEventImages1634880680795';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" ADD "bannerImageUrl" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" DROP COLUMN "bannerImageUrl"`);
    }
}
exports.quickEventImages1634880680795 = quickEventImages1634880680795;
//# sourceMappingURL=1634880680795-quick-event-images.js.map