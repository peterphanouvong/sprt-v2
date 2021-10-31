"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1635379414074 = void 0;
class Init1635379414074 {
    constructor() {
        this.name = 'Init1635379414074';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "event_template" ("templateName" character varying, "id" SERIAL NOT NULL, "title" character varying NOT NULL, "date" TIMESTAMP, "venue" character varying, "address" character varying, "price" integer, "description" character varying, "youtubeLink" character varying, "logoImageLink" character varying, "bannerImageLink" character varying, "capacity" integer, "clubBeemId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "level" character varying, "mixed" character varying, "ownerId" integer, CONSTRAINT "PK_a07c319fab15263c4e20cdcaa7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstname" character varying, "lastname" character varying, "clubName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_36c25110ad321975de2c7e8eb65" UNIQUE ("clubName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "date" TIMESTAMP, "venue" character varying, "address" character varying, "price" integer, "description" character varying, "youtubeLink" character varying, "logoImageLink" character varying, "bannerImageLink" character varying, "capacity" integer, "clubBeemId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "level" character varying, "mixed" character varying, "attendeeConnectionEventId" integer, "attendeeConnectionAttendeeId" integer, "ownerId" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_attendee" ("eventId" integer NOT NULL, "attendeeId" integer NOT NULL, CONSTRAINT "PK_276a2ab1a71e3db913b6555de8a" PRIMARY KEY ("eventId", "attendeeId"))`);
        await queryRunner.query(`CREATE TABLE "attendee" ("id" SERIAL NOT NULL, "firstname" character varying, "lastname" character varying, "email" character varying, "phoneNumber" character varying NOT NULL, "beemId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e63ec576984e1915743066db113" UNIQUE ("phoneNumber"), CONSTRAINT "PK_070338c19378315cb793abac656" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quick_event" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "capacity" integer, "users" character varying NOT NULL DEFAULT '[]', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5195fe5e504a8df64b07281036e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "saved_attendee" ("id" SERIAL NOT NULL, "firstname" character varying, "lastname" character varying, "email" character varying, "phoneNumber" character varying NOT NULL, "beemId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying NOT NULL, "avatarImageLink" character varying, CONSTRAINT "UQ_7e70f7d98f88b39474ccfaf985d" UNIQUE ("phoneNumber"), CONSTRAINT "PK_83e49f10c1b53749d620e4588ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event_template" ADD CONSTRAINT "FK_b6c0725feb7060efaa371ce0299" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_49a4b25ee0d2b1db45d86280345" FOREIGN KEY ("attendeeConnectionEventId", "attendeeConnectionAttendeeId") REFERENCES "event_attendee"("eventId","attendeeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_attendee" ADD CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406" FOREIGN KEY ("attendeeId") REFERENCES "attendee"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event_attendee" DROP CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406"`);
        await queryRunner.query(`ALTER TABLE "event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_49a4b25ee0d2b1db45d86280345"`);
        await queryRunner.query(`ALTER TABLE "event_template" DROP CONSTRAINT "FK_b6c0725feb7060efaa371ce0299"`);
        await queryRunner.query(`DROP TABLE "saved_attendee"`);
        await queryRunner.query(`DROP TABLE "quick_event"`);
        await queryRunner.query(`DROP TABLE "attendee"`);
        await queryRunner.query(`DROP TABLE "event_attendee"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "event_template"`);
    }
}
exports.Init1635379414074 = Init1635379414074;
//# sourceMappingURL=1635379414074-Init.js.map