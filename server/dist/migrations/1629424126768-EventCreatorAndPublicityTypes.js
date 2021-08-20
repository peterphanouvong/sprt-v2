"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCreatorAndPublicityTypes1629424126768 = void 0;
class EventCreatorAndPublicityTypes1629424126768 {
    constructor() {
        this.name = 'EventCreatorAndPublicityTypes1629424126768';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "creator_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d75c471850634c03fe0111a6070" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "publicity_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_80ec4a5f7732999239a16da6228" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "eventTypeId"`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "creatorTypeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "publicityTypeId" integer NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "publicityTypeId"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "creatorTypeId"`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "eventTypeId" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "publicity_type"`);
        await queryRunner.query(`DROP TABLE "creator_type"`);
    }
}
exports.EventCreatorAndPublicityTypes1629424126768 = EventCreatorAndPublicityTypes1629424126768;
//# sourceMappingURL=1629424126768-EventCreatorAndPublicityTypes.js.map