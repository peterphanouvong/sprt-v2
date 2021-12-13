"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTemplate1638932679984 = void 0;
class defaultTemplate1638932679984 {
    async up(queryRunner) {
        await queryRunner.query(`INSERT INTO "user" ("id", "clubName", "email", "password") VALUES (-1, 'default', 'default@gmail.com', '$2a$10$29I1u0O3xqtqFlmPCIz1De2NuH79pqG05uWjZCvxCl1GZae.DkGjC');`);
        await queryRunner.query(`
      INSERT INTO event_template ("templateName", "id", "title", "description", "ownerId") VALUES ('Default_Template', -1, '', '[{"type":"paragraph","children":[{"text":""}]}]', -1);
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "user" WHERE "id" = -1;`);
        await queryRunner.query(`DELETE FROM event_template WHERE "id" = -1;`);
    }
}
exports.defaultTemplate1638932679984 = defaultTemplate1638932679984;
//# sourceMappingURL=1638932679984-default-template.js.map