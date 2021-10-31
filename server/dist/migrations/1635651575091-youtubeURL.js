"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeURL1635651575091 = void 0;
class youtubeURL1635651575091 {
    constructor() {
        this.name = 'youtubeURL1635651575091';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" DROP COLUMN "bannerImageUrl"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" ADD "bannerImageUrl" character varying`);
    }
}
exports.youtubeURL1635651575091 = youtubeURL1635651575091;
//# sourceMappingURL=1635651575091-youtubeURL.js.map