import { MigrationInterface, QueryRunner } from "typeorm";

export class defaultTemplate1638932679984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO event_template ("templateName", "id", "title", "description") VALUES ('Default_Template', -1, '', '[{"type":"paragraph","children":[{"text":""}]}]');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM event_template WHERE "id" = -1;`);
  }
}
