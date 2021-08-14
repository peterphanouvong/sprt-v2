import {MigrationInterface, QueryRunner} from "typeorm";

export class ClubPhone1628903525783 implements MigrationInterface {
    name = 'ClubPhone1628903525783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."club" ADD "phoneNumber" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."club" DROP COLUMN "phoneNumber"`);
    }

}
