"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeURL21635651619149 = void 0;
class youtubeURL21635651619149 {
    constructor() {
        this.name = 'youtubeURL21635651619149';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" ADD "youtubeURL" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" DROP COLUMN "youtubeURL"`);
    }
}
exports.youtubeURL21635651619149 = youtubeURL21635651619149;
//# sourceMappingURL=1635651619149-youtubeURL2.js.map