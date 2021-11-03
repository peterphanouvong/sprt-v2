import {MigrationInterface, QueryRunner} from "typeorm";

export class AttendeeWork1635750708206 implements MigrationInterface {
    name = 'AttendeeWork1635750708206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD "isConfimed" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP COLUMN "isConfimed"`);
    }

}
