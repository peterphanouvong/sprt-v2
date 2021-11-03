import {MigrationInterface, QueryRunner} from "typeorm";

export class AttendeeConfirmedTypo1635750926508 implements MigrationInterface {
    name = 'AttendeeConfirmedTypo1635750926508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" RENAME COLUMN "isConfimed" TO "isConfirmed"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" RENAME COLUMN "isConfirmed" TO "isConfimed"`);
    }

}
