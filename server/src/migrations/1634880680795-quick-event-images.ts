import {MigrationInterface, QueryRunner} from "typeorm";

export class quickEventImages1634880680795 implements MigrationInterface {
    name = 'quickEventImages1634880680795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" ADD "bannerImageUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quick_event" DROP COLUMN "bannerImageUrl"`);
    }

}
