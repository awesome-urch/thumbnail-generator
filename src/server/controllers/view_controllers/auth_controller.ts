import AuthController from "../auth_controller";
import { MySession } from "../../common/types";

class AuthViewController extends AuthController {
  
  authenticationSuccessful(message,user){
    this.res.cookie("accessToken", this.accessToken, { maxAge: 24 * 60 * 60 * 1000 }); 
    const session = this.req.session as MySession;
    session.authenticated = true;
    session.userId = user.id;
    if (session.authenticated){
      console.log("authenticated");
      this.res.redirect("/create-image");
    }else{
      this.res.redirect("/login");
      console.log("not authenticated");
    }
  }

  createError(error){
    console.log("unauthorized 1");
    this.res.render("login", {
      message: error
    });
  }

    
  }
  
  export default AuthViewController;
  