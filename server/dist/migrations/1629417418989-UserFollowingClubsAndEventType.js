"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFollowingClubsAndEventType1629417418989 = void 0;
class UserFollowingClubsAndEventType1629417418989 {
    constructor() {
        this.name = 'UserFollowingClubsAndEventType1629417418989';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "event_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d968f34984d7d85d96f782872fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "eventTypeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."club" ADD CONSTRAINT "UQ_e64de615251e1a76135afbc1353" UNIQUE ("phoneNumber")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."club" DROP CONSTRAINT "UQ_e64de615251e1a76135afbc1353"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "eventTypeId"`);
        await queryRunner.query(`DROP TABLE "event_type"`);
    }
}
exports.UserFollowingClubsAndEventType1629417418989 = UserFollowingClubsAndEventType1629417418989;
//# sourceMappingURL=1629417418989-UserFollowingClubsAndEventType.js.map