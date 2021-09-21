"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadResolver = void 0;
const graphql_upload_1 = require("graphql-upload");
const path_1 = __importDefault(require("path"));
const type_graphql_1 = require("type-graphql");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
    keyFilename: path_1.default.join(__dirname, "../../sprt-5111-c956c44c12d4.json"),
    projectId: "sprt-5111",
});
const bucketName = "test-sprt-bucket";
let UploadResolver = class UploadResolver {
    async uploadImage({ createReadStream, filename }) {
        console.log(filename);
        await new Promise((res) => createReadStream()
            .pipe(storage.bucket(bucketName).file(filename).createWriteStream({
            resumable: false,
            gzip: true,
        }))
            .on("finish", res));
        return true;
    }
    async uploadBannerImage({ createReadStream, filename }, clubname) {
        console.log(filename);
        console.log(clubname);
        const formattedName = clubname
            .replace(" ", "_")
            .concat("/", "banner_image.png");
        console.log(formattedName);
        await new Promise((res) => createReadStream()
            .pipe(storage.bucket(bucketName).file(formattedName).createWriteStream({
            resumable: false,
            gzip: true,
        }))
            .on("finish", res));
        return true;
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("file", () => graphql_upload_1.GraphQLUpload)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "uploadImage", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("file", () => graphql_upload_1.GraphQLUpload)),
    __param(1, type_graphql_1.Arg("clubname")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "uploadBannerImage", null);
UploadResolver = __decorate([
    type_graphql_1.Resolver(graphql_upload_1.Upload)
], UploadResolver);
exports.UploadResolver = UploadResolver;
//# sourceMappingURL=upload.js.map