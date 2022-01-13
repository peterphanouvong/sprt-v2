import {MigrationInterface, QueryRunner} from "typeorm";

export class bankDetails1642035526455 implements MigrationInterface {
    name = 'bankDetails1642035526455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD "bsb" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD "accountNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "bsb" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "accountNumber" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "accountNumber"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "bsb"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP COLUMN "accountNumber"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP COLUMN "bsb"`);
    }

}
