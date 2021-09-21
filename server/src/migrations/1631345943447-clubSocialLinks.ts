import {MigrationInterface, QueryRunner} from "typeorm";

export class clubSocialLinks1631345943447 implements MigrationInterface {
    name = 'clubSocialLinks1631345943447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."club" ADD "facebookLink" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."club" ADD "instagramLink" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."club" ADD "websiteLink" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."club" DROP COLUMN "websiteLink"`);
        await queryRunner.query(`ALTER TABLE "public"."club" DROP COLUMN "instagramLink"`);
        await queryRunner.query(`ALTER TABLE "public"."club" DROP COLUMN "facebookLink"`);
    }

}
