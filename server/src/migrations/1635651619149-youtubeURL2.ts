import {MigrationInterface, QueryRunner} from "typeorm";

export class youtubeURL21635651619149 implements MigrationInterface {
    name = 'youtubeURL21635651619149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" ADD "youtubeURL" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" DROP COLUMN "youtubeURL"`);
    }

}
