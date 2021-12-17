import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableBeemId1639777438397 implements MigrationInterface {
    name = 'NullableBeemId1639777438397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" ALTER COLUMN "clubBeemId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" ALTER COLUMN "clubBeemId" SET NOT NULL`);
    }

}
