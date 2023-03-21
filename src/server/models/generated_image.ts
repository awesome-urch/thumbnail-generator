import BaseModel from "./base";

class GeneratedImageModel extends BaseModel {
  constructor() {
    super("GeneratedImage", "generated_images", [
      "id",
      "user",
      "description",
      "url",
      "base64",
      "size",
      "updated_at",
      "created_at"
    ]);
  }

}


export default GeneratedImageModel;

