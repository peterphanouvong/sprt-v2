import {MigrationInterface, QueryRunner} from "typeorm";

export class ClubRequestedMembers1629008246819 implements MigrationInterface {
    name = 'ClubRequestedMembers1629008246819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "club_requested_member" ("clubId" integer NOT NULL, "requestedMemberId" integer NOT NULL, CONSTRAINT "PK_90b3a774861f08a278eeb6dfa2d" PRIMARY KEY ("clubId", "requestedMemberId"))`);
        await queryRunner.query(`ALTER TABLE "club_requested_member" ADD CONSTRAINT "FK_613b632ef5833d1eb5305cca756" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_requested_member" ADD CONSTRAINT "FK_1652a24fc94e6ef6fd01a5c8cd3" FOREIGN KEY ("requestedMemberId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "club_requested_member" DROP CONSTRAINT "FK_1652a24fc94e6ef6fd01a5c8cd3"`);
        await queryRunner.query(`ALTER TABLE "club_requested_member" DROP CONSTRAINT "FK_613b632ef5833d1eb5305cca756"`);
        await queryRunner.query(`DROP TABLE "club_requested_member"`);
    }

}
