"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockUsers1629674719196 = void 0;
class MockUsers1629674719196 {
    async up(queryRunner) {
        await queryRunner.query(`insert into "user" ("id", "firstname", "lastname", "username", "email", "password") values (995, 'Erik', 'Shoji', 'brock', 'fwillcocks0@networkadvertising.org', '$2a$10$ZE9qfXAvoxPUwL4lm4YpuuoXBPL2ZnO53mY0Nib.Z0QBKONrCakX.');
        insert into "user" ("id", "firstname", "lastname", "username", "email", "password") values (996, 'Matt', 'Anderson', 'ash', 'scorinton1@wisc.edu', '$2a$10$ZE9qfXAvoxPUwL4lm4YpuuoXBPL2ZnO53mY0Nib.Z0QBKONrCakX.');
        insert into "user" ("id", "firstname", "lastname", "username", "email", "password") values (997, 'Earvin', 'Ngapeth', 'misty', 'rburnip2@netlog.com', '$2a$10$ZE9qfXAvoxPUwL4lm4YpuuoXBPL2ZnO53mY0Nib.Z0QBKONrCakX.');
        insert into "user" ("id", "firstname", "lastname", "username", "email", "password") values (998,' Micah', 'Christenson', 'may', 'selliman3@exblog.jp', '$2a$10$ZE9qfXAvoxPUwL4lm4YpuuoXBPL2ZnO53mY0Nib.Z0QBKONrCakX.');
        insert into "user" ("id", "firstname", "lastname", "username", "email", "password") values (999, 'Marouf', 'Sekita', 'red', 'smorffew4@businessinsider.com', '$2a$10$ZE9qfXAvoxPUwL4lm4YpuuoXBPL2ZnO53mY0Nib.Z0QBKONrCakX.');`);
    }
    async down(_) { }
}
exports.MockUsers1629674719196 = MockUsers1629674719196;
//# sourceMappingURL=1629674719196-MockUsers.js.map