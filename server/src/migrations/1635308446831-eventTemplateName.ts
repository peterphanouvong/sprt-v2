import {MigrationInterface, QueryRunner} from "typeorm";

export class eventTemplateName1635308446831 implements MigrationInterface {
    name = 'eventTemplateName1635308446831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP CONSTRAINT "FK_b6c0725feb7060efaa371ce0299"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "templateName"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "templateName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ALTER COLUMN "templateName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD CONSTRAINT "FK_b6c0725feb7060efaa371ce0299" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP CONSTRAINT "FK_b6c0725feb7060efaa371ce0299"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ALTER COLUMN "templateName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "templateName"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD "templateName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD CONSTRAINT "FK_b6c0725feb7060efaa371ce0299" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
