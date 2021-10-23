import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUnusedTables1634947028868 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE club, club_admin, club_event, club_follower, club_member, club_requested_member, club_sport, creator_type, event, event_attendee, event_type, post, publicity_type, sport CASCADE;`
    );
  }

  public async down(_: QueryRunner): Promise<void> {}
}
