"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullableFirstLastUser1634949180744 = void 0;
class nullableFirstLastUser1634949180744 {
    constructor() {
        this.name = 'nullableFirstLastUser1634949180744';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "firstname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastname" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "firstname" SET NOT NULL`);
    }
}
exports.nullableFirstLastUser1634949180744 = nullableFirstLastUser1634949180744;
//# sourceMappingURL=1634949180744-nullableFirstLastUser.js.map