import {MigrationInterface, QueryRunner} from "typeorm";

export class BooleanIsCompleted1635740564278 implements MigrationInterface {
    name = 'BooleanIsCompleted1635740564278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "isCompleted"`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "isCompleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "isCompleted"`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "isCompleted" character varying NOT NULL DEFAULT false`);
    }

}
