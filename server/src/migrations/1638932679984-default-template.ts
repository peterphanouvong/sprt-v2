import { MigrationInterface, QueryRunner } from "typeorm";

export class defaultTemplate1638932679984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" ("id", "clubName", "email", "password") VALUES (-1, 'default', 'default@gmail.com', '$2a$10$29I1u0O3xqtqFlmPCIz1De2NuH79pqG05uWjZCvxCl1GZae.DkGjC');`
    );
    await queryRunner.query(`
      INSERT INTO event_template ("templateName", "id", "title", "description", "ownerId") VALUES ('Default_Template', -1, '', '[{"type":"paragraph","children":[{"text":""}]}]', -1);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user" WHERE "id" = -1;`);
    await queryRunner.query(`DELETE FROM event_template WHERE "id" = -1;`);
  }
}
