import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntities1635308356843 implements MigrationInterface {
    name = 'newEntities1635308356843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "date" TIMESTAMP, "venue" character varying, "address" character varying, "price" integer, "description" character varying, "youtubeLink" character varying, "logoImageLink" character varying, "bannerImageLink" character varying, "capacity" integer, "clubBeemId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "level" character varying, "mixed" character varying, "attendeeConnectionEventId" integer, "attendeeConnectionAttendeeId" integer, "ownerId" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_attendee" ("eventId" integer NOT NULL, "attendeeId" integer NOT NULL, CONSTRAINT "PK_276a2ab1a71e3db913b6555de8a" PRIMARY KEY ("eventId", "attendeeId"))`);
        await queryRunner.query(`CREATE TABLE "attendee" ("id" SERIAL NOT NULL, "firstname" character varying, "lastname" character varying, "email" character varying, "phoneNumber" integer NOT NULL, "beemId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e63ec576984e1915743066db113" UNIQUE ("phoneNumber"), CONSTRAINT "PK_070338c19378315cb793abac656" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_template" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "date" TIMESTAMP, "venue" character varying, "address" character varying, "price" integer, "description" character varying, "youtubeLink" character varying, "logoImageLink" character varying, "bannerImageLink" character varying, "capacity" integer, "clubBeemId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "level" character varying, "mixed" character varying, "templateName" character varying NOT NULL, "attendeeConnectionEventId" integer, "attendeeConnectionAttendeeId" integer, "ownerId" integer, CONSTRAINT "PK_a07c319fab15263c4e20cdcaa7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "saved_attendee" ("id" SERIAL NOT NULL, "firstname" character varying, "lastname" character varying, "email" character varying, "phoneNumber" integer NOT NULL, "beemId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying NOT NULL, "avatarImageLink" character varying, CONSTRAINT "UQ_7e70f7d98f88b39474ccfaf985d" UNIQUE ("phoneNumber"), CONSTRAINT "PK_83e49f10c1b53749d620e4588ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "temp_attendee" ("id" SERIAL NOT NULL, "firstname" character varying, "lastname" character varying, "email" character varying, "phoneNumber" integer NOT NULL, "beemId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_85fe465782811729394ce4d8182" UNIQUE ("phoneNumber"), CONSTRAINT "PK_b2ca75b30d0b89d9693f9e9ecec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."quick_event" DROP COLUMN "bannerImageUrl"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "event_template" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "event_template" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "event" ADD "templateName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_49a4b25ee0d2b1db45d86280345" FOREIGN KEY ("attendeeConnectionEventId", "attendeeConnectionAttendeeId") REFERENCES "event_attendee"("eventId","attendeeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_attendee" ADD CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406" FOREIGN KEY ("attendeeId") REFERENCES "attendee"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_template" ADD CONSTRAINT "FK_e5f80b7e19f24f8c8abe47c8ab5" FOREIGN KEY ("attendeeConnectionEventId", "attendeeConnectionAttendeeId") REFERENCES "event_attendee"("eventId","attendeeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_template" ADD CONSTRAINT "FK_b6c0725feb7060efaa371ce0299" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_template" DROP CONSTRAINT "FK_b6c0725feb7060efaa371ce0299"`);
        await queryRunner.query(`ALTER TABLE "event_template" DROP CONSTRAINT "FK_e5f80b7e19f24f8c8abe47c8ab5"`);
        await queryRunner.query(`ALTER TABLE "event_attendee" DROP CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406"`);
        await queryRunner.query(`ALTER TABLE "event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_49a4b25ee0d2b1db45d86280345"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "templateName"`);
        await queryRunner.query(`ALTER TABLE "event_template" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "event_template" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "event" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."quick_event" ADD "bannerImageUrl" character varying`);
        await queryRunner.query(`DROP TABLE "temp_attendee"`);
        await queryRunner.query(`DROP TABLE "saved_attendee"`);
        await queryRunner.query(`DROP TABLE "event_template"`);
        await queryRunner.query(`DROP TABLE "attendee"`);
        await queryRunner.query(`DROP TABLE "event_attendee"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
