"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClubLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const Club_1 = require("../entities/Club");
const createClubLoader = () => new dataloader_1.default(async (clubIds) => {
    const clubs = await Club_1.Club.findByIds(clubIds);
    const clubIdsToUser = {};
    clubs.forEach((u) => {
        clubIdsToUser[u.id] = u;
    });
    return clubIds.map((userId) => clubIdsToUser[userId]);
});
exports.createClubLoader = createClubLoader;
//# sourceMappingURL=createClubLoader.js.map