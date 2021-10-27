import {MigrationInterface, QueryRunner} from "typeorm";

export class nullableFirstLastUser1634949180744 implements MigrationInterface {
    name = 'nullableFirstLastUser1634949180744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "firstname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastname" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "firstname" SET NOT NULL`);
    }

}
