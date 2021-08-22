"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFirstnameLastname1629674707121 = void 0;
class UserFirstnameLastname1629674707121 {
    constructor() {
        this.name = 'UserFirstnameLastname1629674707121';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "firstname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "lastname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD CONSTRAINT "FK_d7f5bb4947a9f56ea860595b575" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP CONSTRAINT "FK_d7f5bb4947a9f56ea860595b575"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "firstname"`);
    }
}
exports.UserFirstnameLastname1629674707121 = UserFirstnameLastname1629674707121;
//# sourceMappingURL=1629674707121-UserFirstnameLastname.js.map