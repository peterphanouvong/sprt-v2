import {MigrationInterface, QueryRunner} from "typeorm";

export class EventTimes1628843323551 implements MigrationInterface {
    name = 'EventTimes1628843323551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "datetime"`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "startTime" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "endTime" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "datetime" TIMESTAMP NOT NULL`);
    }

}
