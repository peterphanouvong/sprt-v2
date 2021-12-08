"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTemplate1638932679984 = void 0;
class defaultTemplate1638932679984 {
    async up(queryRunner) {
        await queryRunner.query(`
      INSERT INTO event_template ("templateName", "id", "title", "description") VALUES ('Default_Template', -1, '', '[{"type":"paragraph","children":[{"text":""}]}]');
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM event_template WHERE "id" = -1;`);
    }
}
exports.defaultTemplate1638932679984 = defaultTemplate1638932679984;
//# sourceMappingURL=1638932679984-default-template.js.map