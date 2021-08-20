"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCreatorAndPublicityTypesPopulate1629424261505 = void 0;
class EventCreatorAndPublicityTypesPopulate1629424261505 {
    async up(queryRunner) {
        await queryRunner.query(`
            insert into "creator_type" ("id", "name") values (1, 'user');
            insert into "creator_type" ("id", "name") values (2, 'club');

            insert into "publicity_type" ("id", "name") values (1, 'public');
            insert into "publicity_type" ("id", "name") values (2, 'private');
        `);
    }
    async down(_) { }
}
exports.EventCreatorAndPublicityTypesPopulate1629424261505 = EventCreatorAndPublicityTypesPopulate1629424261505;
//# sourceMappingURL=1629424261505-EventCreatorAndPublicityTypesPopulate.js.map