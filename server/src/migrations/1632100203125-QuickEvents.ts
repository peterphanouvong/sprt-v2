import {MigrationInterface, QueryRunner} from "typeorm";

export class QuickEvents1632100203125 implements MigrationInterface {
    name = 'QuickEvents1632100203125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quick_event" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "capacity" integer, "users" jsonb NOT NULL DEFAULT '[]', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5195fe5e504a8df64b07281036e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "quick_event"`);
    }

}
