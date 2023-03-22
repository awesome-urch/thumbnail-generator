import Wallet from "../models/wallet";
import User from "../models/user";
import {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} from "../helpers/error_helper";
import BaseController from "./base_controller";
import { Configuration, OpenAIApi } from "openai";
import GeneratedImageModel from "../models/generated_image";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});


class ImageController extends BaseController {

  async test(){
    const props = this.req.body;

    if (!props.description){
      return this.next(createError({
        status: BAD_REQUEST,
        message: "`description` is required"
      }));
    }

    const openai = new OpenAIApi(configuration);
    // const response = await openai.listEngines();

    // console.log(response);

    // return;

    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: "Create a list of 8 questions for my interview with a science fiction author:",
    //   temperature: 0.5,
    //   max_tokens: 150,
    //   top_p: 1.0,
    //   frequency_penalty: 0.0,
    //   presence_penalty: 0.0,
    // });

    // this.next(createError({
    //   status: UNAUTHORIZED,
    //   message: "Invalid user"
    // }));

    // return this.next(createError({
    //   status: UNAUTHORIZED,
    //   message: "Unauthorized user"
    // }));

    const size = 256;

    try{
      const response = await openai.createImage({
        prompt: props.description,
        n: 1,
        size: "256x256",
      });

      console.log("we here");

      //insert the generated image to db
      const generatedImage = {
        user: this.req.user,
        description:props.description,
        url: response.data.data[0].url,
        base64: "",
        size: size
      };

      console.log(generatedImage);

      await new GeneratedImageModel().create(generatedImage);

      this.res.json({
        ok: true,
        message: "Request successful",
        engines: response.data
      });

    }catch(err){
      console.log("error with image");
      return this.next(createError({
        status: BAD_REQUEST,
        message: err
      }));
    }

    return;
  }

 
}

  
  export default ImageController;
  