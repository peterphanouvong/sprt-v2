import { MigrationInterface, QueryRunner } from "typeorm";

export class EventCreatorAndPublicityTypesPopulate1629424261505
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            insert into "creator_type" ("id", "name") values (1, 'user');
            insert into "creator_type" ("id", "name") values (2, 'club');

            insert into "publicity_type" ("id", "name") values (1, 'public');
            insert into "publicity_type" ("id", "name") values (2, 'private');
        `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
