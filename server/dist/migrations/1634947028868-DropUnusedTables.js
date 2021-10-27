"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropUnusedTables1634947028868 = void 0;
class DropUnusedTables1634947028868 {
    async up(queryRunner) {
        await queryRunner.query(`DROP TABLE club, club_admin, club_event, club_follower, club_member, club_requested_member, club_sport, creator_type, event, event_attendee, event_type, post, publicity_type, sport CASCADE;`);
    }
    async down(_) { }
}
exports.DropUnusedTables1634947028868 = DropUnusedTables1634947028868;
//# sourceMappingURL=1634947028868-DropUnusedTables.js.map