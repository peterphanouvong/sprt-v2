import {MigrationInterface, QueryRunner} from "typeorm";

export class CascadeDeleteEvent1629948379664 implements MigrationInterface {
    name = 'CascadeDeleteEvent1629948379664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406"`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406" FOREIGN KEY ("attendeeId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406"`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406" FOREIGN KEY ("attendeeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
