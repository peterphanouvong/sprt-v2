import {MigrationInterface, QueryRunner} from "typeorm";

export class isPayingCash1639364646975 implements MigrationInterface {
    name = 'isPayingCash1639364646975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" ADD "isPayingCash" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP CONSTRAINT "FK_b6c0725feb7060efaa371ce0299"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ALTER COLUMN "ownerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD CONSTRAINT "FK_b6c0725feb7060efaa371ce0299" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP CONSTRAINT "FK_b6c0725feb7060efaa371ce0299"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ALTER COLUMN "ownerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD CONSTRAINT "FK_b6c0725feb7060efaa371ce0299" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."event_attendee" DROP COLUMN "isPayingCash"`);
    }

}
