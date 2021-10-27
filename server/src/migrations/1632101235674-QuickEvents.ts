import {MigrationInterface, QueryRunner} from "typeorm";

export class QuickEvents1632101235674 implements MigrationInterface {
    name = 'QuickEvents1632101235674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" DROP COLUMN "users"`);
        await queryRunner.query(`ALTER TABLE "public"."quick_event" ADD "users" character varying NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" DROP COLUMN "users"`);
        await queryRunner.query(`ALTER TABLE "public"."quick_event" ADD "users" jsonb NOT NULL DEFAULT '[]'`);
    }

}
