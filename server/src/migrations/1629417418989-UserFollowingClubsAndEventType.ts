import {MigrationInterface, QueryRunner} from "typeorm";

export class UserFollowingClubsAndEventType1629417418989 implements MigrationInterface {
    name = 'UserFollowingClubsAndEventType1629417418989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d968f34984d7d85d96f782872fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "eventTypeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."club" ADD CONSTRAINT "UQ_e64de615251e1a76135afbc1353" UNIQUE ("phoneNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."club" DROP CONSTRAINT "UQ_e64de615251e1a76135afbc1353"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "eventTypeId"`);
        await queryRunner.query(`DROP TABLE "event_type"`);
    }

}
