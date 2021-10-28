"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inheritance1635384176736 = void 0;
class Inheritance1635384176736 {
    constructor() {
        this.name = "Inheritance1635384176736";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."attendee" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."attendee" ADD "avatarImageLink" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."attendee" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_c2638020842e96a1b93b988d68" ON "public"."attendee" ("type") `);
        await queryRunner.query(`drop table saved_attendee`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_c2638020842e96a1b93b988d68"`);
        await queryRunner.query(`ALTER TABLE "public"."attendee" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "public"."attendee" DROP COLUMN "avatarImageLink"`);
        await queryRunner.query(`ALTER TABLE "public"."attendee" DROP COLUMN "password"`);
    }
}
exports.Inheritance1635384176736 = Inheritance1635384176736;
//# sourceMappingURL=1635384176736-Inheritance.js.map