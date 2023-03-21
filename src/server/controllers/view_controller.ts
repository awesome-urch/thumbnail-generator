import BaseController from "./base_controller";
import { MySession } from "../common/types";
import GeneratedImageModel from "../models/generated_image";

class ViewController extends BaseController {

  async renderCreateImagePage(){
    const session = this.req.session as MySession;
    console.log(session.userId);

    if(!session.authenticated){
      this.res.redirect("/login");
      return;
    }

    const getGeneratedImages = await new GeneratedImageModel().find({user:session.userId});
    console.log(getGeneratedImages);
    if (session.authenticated) {
          this.res.render("create-image",{
            getGeneratedImages: getGeneratedImages
        });
      } else {
          // Redirect to login page if user is not authenticated
          this.res.redirect("/login");
      }
  }

}
  
export default ViewController;
  