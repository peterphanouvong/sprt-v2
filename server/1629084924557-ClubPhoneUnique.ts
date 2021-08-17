import {MigrationInterface, QueryRunner} from "typeorm";

export class ClubPhoneUnique1629084924557 implements MigrationInterface {
    name = 'ClubPhoneUnique1629084924557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."club" ADD CONSTRAINT "UQ_e64de615251e1a76135afbc1353" UNIQUE ("phoneNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."club" DROP CONSTRAINT "UQ_e64de615251e1a76135afbc1353"`);
    }

}
