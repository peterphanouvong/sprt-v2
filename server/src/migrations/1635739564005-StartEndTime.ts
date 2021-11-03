import {MigrationInterface, QueryRunner} from "typeorm";

export class StartEndTime1635739564005 implements MigrationInterface {
    name = 'StartEndTime1635739564005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "isCompleted" character varying NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "startTime" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "endTime" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "isCompleted"`);
    }

}
