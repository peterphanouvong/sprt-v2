import {MigrationInterface, QueryRunner} from "typeorm";

export class EventClubId1629430381084 implements MigrationInterface {
    name = 'EventClubId1629430381084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "clubId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "clubId"`);
    }

}
