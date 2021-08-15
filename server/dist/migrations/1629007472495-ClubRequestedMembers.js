"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubRequestedMembers1629007472495 = void 0;
class ClubRequestedMembers1629007472495 {
    constructor() {
        this.name = 'ClubRequestedMembers1629007472495';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "club_requested_member" ("club_id" integer NOT NULL, "requested_member_id" integer NOT NULL, "clubId" integer, "requestedMemberId" integer, CONSTRAINT "PK_6a50c5e757cd6827617006c4422" PRIMARY KEY ("club_id", "requested_member_id"))`);
        await queryRunner.query(`ALTER TABLE "club_requested_member" ADD CONSTRAINT "FK_613b632ef5833d1eb5305cca756" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_requested_member" ADD CONSTRAINT "FK_1652a24fc94e6ef6fd01a5c8cd3" FOREIGN KEY ("requestedMemberId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "club_requested_member" DROP CONSTRAINT "FK_1652a24fc94e6ef6fd01a5c8cd3"`);
        await queryRunner.query(`ALTER TABLE "club_requested_member" DROP CONSTRAINT "FK_613b632ef5833d1eb5305cca756"`);
        await queryRunner.query(`DROP TABLE "club_requested_member"`);
    }
}
exports.ClubRequestedMembers1629007472495 = ClubRequestedMembers1629007472495;
//# sourceMappingURL=1629007472495-ClubRequestedMembers.js.map