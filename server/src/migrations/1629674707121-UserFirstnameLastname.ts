import {MigrationInterface, QueryRunner} from "typeorm";

export class UserFirstnameLastname1629674707121 implements MigrationInterface {
    name = 'UserFirstnameLastname1629674707121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "firstname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "lastname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD CONSTRAINT "FK_d7f5bb4947a9f56ea860595b575" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP CONSTRAINT "FK_d7f5bb4947a9f56ea860595b575"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "firstname"`);
    }

}
