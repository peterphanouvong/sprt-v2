import { FileUpload, GraphQLUpload, Upload } from "graphql-upload";
import path from "path";
import { Arg, Mutation, Resolver } from "type-graphql";
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: path.join(__dirname, "../../sprt-5111-c956c44c12d4.json"),
  projectId: "sprt-5111",
});

@Resolver(Upload)
export class UploadResolver {
  @Mutation(() => Boolean)
  async uploadImage(
    //1
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload
  ): Promise<boolean> {
    console.log(filename);
    await new Promise((res) =>
      createReadStream()
        .pipe(
          storage.bucket("test-sprt-bucket").file(filename).createWriteStream({
            resumable: false,
            gzip: true,
          })
        )
        .on("finish", res)
    );

    return true;
  }
}
