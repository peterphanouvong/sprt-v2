import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1628905847187 implements MigrationInterface {
    name = 'Initialize1628905847187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "creatorId" integer NOT NULL, "points" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "club_event" ("clubId" integer NOT NULL, "eventId" integer NOT NULL, CONSTRAINT "PK_48146b5adf3a6de0f807ae56d08" PRIMARY KEY ("clubId", "eventId"))`);
        await queryRunner.query(`CREATE TABLE "event_attendee" ("eventId" integer NOT NULL, "attendeeId" integer NOT NULL, CONSTRAINT "PK_276a2ab1a71e3db913b6555de8a" PRIMARY KEY ("eventId", "attendeeId"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "location" character varying NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "hostId" integer NOT NULL, "points" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "club_follower" ("clubId" integer NOT NULL, "followerId" integer NOT NULL, CONSTRAINT "PK_7381c8401784d62f2591649f097" PRIMARY KEY ("clubId", "followerId"))`);
        await queryRunner.query(`CREATE TABLE "club_member" ("clubId" integer NOT NULL, "memberId" integer NOT NULL, CONSTRAINT "PK_b8453131335a055cabe58490d39" PRIMARY KEY ("clubId", "memberId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "club_admin" ("clubId" integer NOT NULL, "adminId" integer NOT NULL, CONSTRAINT "PK_2ce91b5a985ef1448f5e73777e6" PRIMARY KEY ("clubId", "adminId"))`);
        await queryRunner.query(`CREATE TABLE "club" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_79098e276529e2f823ab6379e8f" UNIQUE ("name"), CONSTRAINT "UQ_3276cadeca232b6a6f4983c9652" UNIQUE ("email"), CONSTRAINT "PK_79282481e036a6e0b180afa38aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sport" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_6a16e1d83cb581484036cee92bf" UNIQUE ("name"), CONSTRAINT "PK_c67275331afac347120a1032825" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "club_sport" ("clubId" integer NOT NULL, "sportId" integer NOT NULL, CONSTRAINT "PK_0f2059c08f832b6b22920a57467" PRIMARY KEY ("clubId", "sportId"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_event" ADD CONSTRAINT "FK_41e92bd6eeb4b4f5ff68d35479b" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_event" ADD CONSTRAINT "FK_e45db0f158d76399b5bed1927e7" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_attendee" ADD CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406" FOREIGN KEY ("attendeeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_fb103c0ac614a2d39d6b62de6fd" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_follower" ADD CONSTRAINT "FK_b90915286d01cf4a74b04103e81" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_follower" ADD CONSTRAINT "FK_054bac8540e81932604be9689ce" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_member" ADD CONSTRAINT "FK_1047687a2fa4d8aa55ce9ff46ad" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_member" ADD CONSTRAINT "FK_be8f1ec2e48c5b5f3461a700ac9" FOREIGN KEY ("memberId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_admin" ADD CONSTRAINT "FK_bd36ab4842b10bb6342b5774d90" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_admin" ADD CONSTRAINT "FK_b3307f02d893bb36dd36b7468b3" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_sport" ADD CONSTRAINT "FK_17e8628e87fd66a8b7357f67557" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_sport" ADD CONSTRAINT "FK_8c1cda6e237c4ad5ccaf3d0b981" FOREIGN KEY ("sportId") REFERENCES "sport"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "club_sport" DROP CONSTRAINT "FK_8c1cda6e237c4ad5ccaf3d0b981"`);
        await queryRunner.query(`ALTER TABLE "club_sport" DROP CONSTRAINT "FK_17e8628e87fd66a8b7357f67557"`);
        await queryRunner.query(`ALTER TABLE "club_admin" DROP CONSTRAINT "FK_b3307f02d893bb36dd36b7468b3"`);
        await queryRunner.query(`ALTER TABLE "club_admin" DROP CONSTRAINT "FK_bd36ab4842b10bb6342b5774d90"`);
        await queryRunner.query(`ALTER TABLE "club_member" DROP CONSTRAINT "FK_be8f1ec2e48c5b5f3461a700ac9"`);
        await queryRunner.query(`ALTER TABLE "club_member" DROP CONSTRAINT "FK_1047687a2fa4d8aa55ce9ff46ad"`);
        await queryRunner.query(`ALTER TABLE "club_follower" DROP CONSTRAINT "FK_054bac8540e81932604be9689ce"`);
        await queryRunner.query(`ALTER TABLE "club_follower" DROP CONSTRAINT "FK_b90915286d01cf4a74b04103e81"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_fb103c0ac614a2d39d6b62de6fd"`);
        await queryRunner.query(`ALTER TABLE "event_attendee" DROP CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406"`);
        await queryRunner.query(`ALTER TABLE "event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`);
        await queryRunner.query(`ALTER TABLE "club_event" DROP CONSTRAINT "FK_e45db0f158d76399b5bed1927e7"`);
        await queryRunner.query(`ALTER TABLE "club_event" DROP CONSTRAINT "FK_41e92bd6eeb4b4f5ff68d35479b"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"`);
        await queryRunner.query(`DROP TABLE "club_sport"`);
        await queryRunner.query(`DROP TABLE "sport"`);
        await queryRunner.query(`DROP TABLE "club"`);
        await queryRunner.query(`DROP TABLE "club_admin"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "club_member"`);
        await queryRunner.query(`DROP TABLE "club_follower"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "event_attendee"`);
        await queryRunner.query(`DROP TABLE "club_event"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
