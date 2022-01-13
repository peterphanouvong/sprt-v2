import {MigrationInterface, QueryRunner} from "typeorm";

export class bankDetailsTemplate1642042475189 implements MigrationInterface {
    name = 'bankDetailsTemplate1642042475189'

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
