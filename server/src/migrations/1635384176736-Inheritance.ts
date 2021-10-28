import { MigrationInterface, QueryRunner } from "typeorm";

export class Inheritance1635384176736 implements MigrationInterface {
  name = "Inheritance1635384176736";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."attendee" ADD "password" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."attendee" ADD "avatarImageLink" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."attendee" ADD "type" character varying NOT NULL`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c2638020842e96a1b93b988d68" ON "public"."attendee" ("type") `
    );
    await queryRunner.query(`drop table saved_attendee`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c2638020842e96a1b93b988d68"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."attendee" DROP COLUMN "type"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."attendee" DROP COLUMN "avatarImageLink"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."attendee" DROP COLUMN "password"`
    );
  }
}
