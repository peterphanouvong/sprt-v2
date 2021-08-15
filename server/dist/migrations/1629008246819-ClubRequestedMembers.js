"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubRequestedMembers1629008246819 = void 0;
class ClubRequestedMembers1629008246819 {
    constructor() {
        this.name = 'ClubRequestedMembers1629008246819';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "club_requested_member" ("clubId" integer NOT NULL, "requestedMemberId" integer NOT NULL, CONSTRAINT "PK_90b3a774861f08a278eeb6dfa2d" PRIMARY KEY ("clubId", "requestedMemberId"))`);
        await queryRunner.query(`ALTER TABLE "club_requested_member" ADD CONSTRAINT "FK_613b632ef5833d1eb5305cca756" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_requested_member" ADD CONSTRAINT "FK_1652a24fc94e6ef6fd01a5c8cd3" FOREIGN KEY ("requestedMemberId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "club_requested_member" DROP CONSTRAINT "FK_1652a24fc94e6ef6fd01a5c8cd3"`);
        await queryRunner.query(`ALTER TABLE "club_requested_member" DROP CONSTRAINT "FK_613b632ef5833d1eb5305cca756"`);
        await queryRunner.query(`DROP TABLE "club_requested_member"`);
    }
}
exports.ClubRequestedMembers1629008246819 = ClubRequestedMembers1629008246819;
//# sourceMappingURL=1629008246819-ClubRequestedMembers.js.map