import { MigrationInterface, QueryRunner } from "typeorm";

export class MockClubs1628919983149 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into "user" ("id", "username", "email", "password") values (995, 'brock', 'fwillcocks0@networkadvertising.org', '$2a$10$ZE9qfXAvoxPUwL4lm4YpuuoXBPL2ZnO53mY0Nib.Z0QBKONrCakX.');
          insert into "user" ("id", "username", "email", "password") values (996, 'ash', 'scorinton1@wisc.edu', '$2a$10$ZE9qfXAvoxPUwL4lm4YpuuoXBPL2ZnO53mY0Nib.Z0QBKONrCakX.');
          insert into "user" ("id", "username", "email", "password") values (997, 'misty', 'rburnip2@netlog.com', '$2a$10$ZE9qfXAvoxPUwL4lm4YpuuoXBPL2ZnO53mY0Nib.Z0QBKONrCakX.');
          insert into "user" ("id", "username", "email", "password") values (998, 'may', 'selliman3@exblog.jp', '$2a$10$ZE9qfXAvoxPUwL4lm4YpuuoXBPL2ZnO53mY0Nib.Z0QBKONrCakX.');
          insert into "user" ("id", "username", "email", "password") values (999, 'red', 'smorffew4@businessinsider.com', '$2a$10$ZE9qfXAvoxPUwL4lm4YpuuoXBPL2ZnO53mY0Nib.Z0QBKONrCakX.');`
    );

    await queryRunner.query(
      `insert into "club" ("id", "name", "email", "phoneNumber", "description") values (995, 'Eayo', 'hgetsham0@nytimes.com', '5491433760', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.
    
      Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      
      Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.');
      insert into "club" ("id", "name", "email", "phoneNumber", "description") values (996, 'Divavu', 'lcakes1@cisco.com', '4785594001', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.
      
      Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.
      
      Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.');
      insert into "club" ("id", "name", "email", "phoneNumber", "description") values (997, 'Blogpad', 'hodriscoll2@skyrock.com', '4918838545', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.
      
      Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.
      
      In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.');
      insert into "club" ("id", "name", "email", "phoneNumber", "description") values (998, 'Quimm', 'vvogl3@networksolutions.com', '7197348481', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.');
      insert into "club" ("id", "name", "email", "phoneNumber", "description") values (999, 'Reallinks', 'asantori4@indiegogo.com', '7972744770', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.');`
    );

    await queryRunner.query(`
      insert into "club_admin" ("clubId", "adminId") values (995, 995);
      insert into "club_admin" ("clubId", "adminId") values (996, 996);
      insert into "club_admin" ("clubId", "adminId") values (997, 997);
      insert into "club_admin" ("clubId", "adminId") values (998, 998);
      insert into "club_admin" ("clubId", "adminId") values (999, 999);
    `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
