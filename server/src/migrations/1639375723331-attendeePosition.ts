import {MigrationInterface, QueryRunner} from "typeorm";

export class attendeePosition1639375723331 implements MigrationInterface {
    name = 'attendeePosition1639375723331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD "position" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP COLUMN "position"`);
    }

}
