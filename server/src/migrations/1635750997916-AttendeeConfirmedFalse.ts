import {MigrationInterface, QueryRunner} from "typeorm";

export class AttendeeConfirmedFalse1635750997916 implements MigrationInterface {
    name = 'AttendeeConfirmedFalse1635750997916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ALTER COLUMN "isConfirmed" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ALTER COLUMN "isConfirmed" DROP DEFAULT`);
    }

}
