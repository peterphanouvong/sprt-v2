import {MigrationInterface, QueryRunner} from "typeorm";

export class EventEndTimeNullable1630045330289 implements MigrationInterface {
    name = 'EventEndTimeNullable1630045330289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" ALTER COLUMN "endTime" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" ALTER COLUMN "endTime" SET NOT NULL`);
    }

}
