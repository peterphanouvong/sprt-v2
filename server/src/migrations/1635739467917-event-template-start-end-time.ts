import {MigrationInterface, QueryRunner} from "typeorm";

export class eventTemplateStartEndTime1635739467917 implements MigrationInterface {
    name = 'eventTemplateStartEndTime1635739467917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD "startTime" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD "endTime" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP COLUMN "startTime"`);
    }

}
