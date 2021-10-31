import {MigrationInterface, QueryRunner} from "typeorm";

export class youtubeURL1635651575091 implements MigrationInterface {
    name = 'youtubeURL1635651575091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" DROP COLUMN "bannerImageUrl"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" ADD "bannerImageUrl" character varying`);
    }

}
