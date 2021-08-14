import { MigrationInterface, QueryRunner } from "typeorm";

export class EventCapacity1628924423218 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table "event" add column "capacity" integer;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
