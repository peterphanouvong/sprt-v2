import {MigrationInterface, QueryRunner} from "typeorm";

export class Reset1634946910451 implements MigrationInterface {
    name = 'Reset1634946910451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME COLUMN "username" TO "clubName"`);
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" TO "UQ_36c25110ad321975de2c7e8eb65"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME CONSTRAINT "UQ_36c25110ad321975de2c7e8eb65" TO "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME COLUMN "clubName" TO "username"`);
    }

}
