"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerId1637637955524 = void 0;
class OwnerId1637637955524 {
    constructor() {
        this.name = 'OwnerId1637637955524';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`);
        await queryRunner.query(`ALTER TABLE "public"."event" ALTER COLUMN "ownerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`);
        await queryRunner.query(`ALTER TABLE "public"."event" ALTER COLUMN "ownerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.OwnerId1637637955524 = OwnerId1637637955524;
//# sourceMappingURL=1637637955524-OwnerId.js.map