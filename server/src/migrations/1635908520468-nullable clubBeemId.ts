import {MigrationInterface, QueryRunner} from "typeorm";

export class nullableClubBeemId1635908520468 implements MigrationInterface {
    name = 'nullableClubBeemId1635908520468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_template" ALTER COLUMN "clubBeemId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_template" ALTER COLUMN "clubBeemId" SET NOT NULL`);
    }

}
