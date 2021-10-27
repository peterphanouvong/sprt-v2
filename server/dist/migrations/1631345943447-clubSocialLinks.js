"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clubSocialLinks1631345943447 = void 0;
class clubSocialLinks1631345943447 {
    constructor() {
        this.name = 'clubSocialLinks1631345943447';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."club" ADD "facebookLink" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."club" ADD "instagramLink" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."club" ADD "websiteLink" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."club" DROP COLUMN "websiteLink"`);
        await queryRunner.query(`ALTER TABLE "public"."club" DROP COLUMN "instagramLink"`);
        await queryRunner.query(`ALTER TABLE "public"."club" DROP COLUMN "facebookLink"`);
    }
}
exports.clubSocialLinks1631345943447 = clubSocialLinks1631345943447;
//# sourceMappingURL=1631345943447-clubSocialLinks.js.map