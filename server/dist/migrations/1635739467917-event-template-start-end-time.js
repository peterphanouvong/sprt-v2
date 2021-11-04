"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventTemplateStartEndTime1635739467917 = void 0;
class eventTemplateStartEndTime1635739467917 {
    constructor() {
        this.name = 'eventTemplateStartEndTime1635739467917';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD "startTime" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" ADD "endTime" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "public"."event_template" DROP COLUMN "startTime"`);
    }
}
exports.eventTemplateStartEndTime1635739467917 = eventTemplateStartEndTime1635739467917;
//# sourceMappingURL=1635739467917-event-template-start-end-time.js.map