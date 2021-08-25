import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeDelete1629865291984 implements MigrationInterface {
  name = "CascadeDelete1629865291984";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."club_event" DROP CONSTRAINT "FK_41e92bd6eeb4b4f5ff68d35479b"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_follower" DROP CONSTRAINT "FK_054bac8540e81932604be9689ce"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_follower" DROP CONSTRAINT "FK_b90915286d01cf4a74b04103e81"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_member" DROP CONSTRAINT "FK_be8f1ec2e48c5b5f3461a700ac9"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_member" DROP CONSTRAINT "FK_1047687a2fa4d8aa55ce9ff46ad"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_requested_member" DROP CONSTRAINT "FK_1652a24fc94e6ef6fd01a5c8cd3"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_requested_member" DROP CONSTRAINT "FK_613b632ef5833d1eb5305cca756"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_admin" DROP CONSTRAINT "FK_b3307f02d893bb36dd36b7468b3"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_admin" DROP CONSTRAINT "FK_bd36ab4842b10bb6342b5774d90"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_sport" DROP CONSTRAINT "FK_17e8628e87fd66a8b7357f67557"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_event" ADD CONSTRAINT "FK_41e92bd6eeb4b4f5ff68d35479b" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_follower" ADD CONSTRAINT "FK_b90915286d01cf4a74b04103e81" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_follower" ADD CONSTRAINT "FK_054bac8540e81932604be9689ce" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_member" ADD CONSTRAINT "FK_1047687a2fa4d8aa55ce9ff46ad" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_member" ADD CONSTRAINT "FK_be8f1ec2e48c5b5f3461a700ac9" FOREIGN KEY ("memberId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_requested_member" ADD CONSTRAINT "FK_613b632ef5833d1eb5305cca756" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_requested_member" ADD CONSTRAINT "FK_1652a24fc94e6ef6fd01a5c8cd3" FOREIGN KEY ("requestedMemberId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_admin" ADD CONSTRAINT "FK_bd36ab4842b10bb6342b5774d90" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_admin" ADD CONSTRAINT "FK_b3307f02d893bb36dd36b7468b3" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_sport" ADD CONSTRAINT "FK_17e8628e87fd66a8b7357f67557" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."club_sport" DROP CONSTRAINT "FK_17e8628e87fd66a8b7357f67557"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_admin" DROP CONSTRAINT "FK_b3307f02d893bb36dd36b7468b3"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_admin" DROP CONSTRAINT "FK_bd36ab4842b10bb6342b5774d90"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_requested_member" DROP CONSTRAINT "FK_1652a24fc94e6ef6fd01a5c8cd3"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_requested_member" DROP CONSTRAINT "FK_613b632ef5833d1eb5305cca756"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_member" DROP CONSTRAINT "FK_be8f1ec2e48c5b5f3461a700ac9"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_member" DROP CONSTRAINT "FK_1047687a2fa4d8aa55ce9ff46ad"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_follower" DROP CONSTRAINT "FK_054bac8540e81932604be9689ce"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_follower" DROP CONSTRAINT "FK_b90915286d01cf4a74b04103e81"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_event" DROP CONSTRAINT "FK_41e92bd6eeb4b4f5ff68d35479b"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_sport" ADD CONSTRAINT "FK_17e8628e87fd66a8b7357f67557" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_admin" ADD CONSTRAINT "FK_bd36ab4842b10bb6342b5774d90" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_admin" ADD CONSTRAINT "FK_b3307f02d893bb36dd36b7468b3" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_requested_member" ADD CONSTRAINT "FK_613b632ef5833d1eb5305cca756" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_requested_member" ADD CONSTRAINT "FK_1652a24fc94e6ef6fd01a5c8cd3" FOREIGN KEY ("requestedMemberId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_member" ADD CONSTRAINT "FK_1047687a2fa4d8aa55ce9ff46ad" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_member" ADD CONSTRAINT "FK_be8f1ec2e48c5b5f3461a700ac9" FOREIGN KEY ("memberId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_follower" ADD CONSTRAINT "FK_b90915286d01cf4a74b04103e81" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_follower" ADD CONSTRAINT "FK_054bac8540e81932604be9689ce" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."club_event" ADD CONSTRAINT "FK_41e92bd6eeb4b4f5ff68d35479b" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
