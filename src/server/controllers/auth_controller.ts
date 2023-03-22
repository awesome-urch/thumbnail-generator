import User from "../models/user";
import AccessTokenModel from "../models/access_token";
import crypto from "crypto";
import {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} from "../helpers/error_helper";
import BaseController from "./base_controller";

class AuthController extends BaseController {

  tokenExpireDays = 1;
  accessToken = "";
  page = "login";

  authenticationSuccessful(message,user){
    console.log(message);
    this.res.json({
      ok: true,
      message: message,
      data:{user:user,token:this.accessToken}
    });
  }

  createError(code, error){
    console.log("unauthorized");
    this.next(createError({
      status: code,
      message: error
    }));
  }


  async generateToken(userId:string){
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + this.tokenExpireDays);

    let token = crypto.randomBytes(64).toString("hex");
    const tokenExists = await new AccessTokenModel().findOne({access_token:token});
    while(tokenExists){
      token = crypto.randomBytes(64).toString("hex");
    }

    const accessToken = await new AccessTokenModel().create({
      user_id:userId,
      access_token:token,
      access_token_expires_on:nextDate
    });

    return await new AccessTokenModel().findOne({id:accessToken[0]});
  }
  
    async postLogin(){
      this.page = "login";
      const username = String(this.req.body.username);
      const password = String(this.req.body.password);

      if (!username || !password) this.next(createError({
        status: BAD_REQUEST,
        message: "`username` + `password` are required fields"
      }));

      try{
        const users = await new User().verify(username, password);
        if(users){
          const user = users[0];
          const getAccessToken = await this.generateToken(user.id);
          this.accessToken = getAccessToken.access_token;

          this.authenticationSuccessful("Login successful",user);
        }else{
          this.createError(UNAUTHORIZED,"");
        }
      }catch(err){
        console.log("pt1");
        this.createError(UNAUTHORIZED,err);
      }
    }

    async postRegister() {
      this.page = "register";
      const props = this.req.body;

      const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      if(!emailRegexp.test(props.email)){
        return this.createError(
          BAD_REQUEST,
          "Email address is not valid");
      }

      if (!props.username || !props.password){
        return this.createError(
          BAD_REQUEST,
          "`username` + `password` are required fields");
      }

      const user = await new User().findOne({ username: props.username });

      if(user){
        return this.createError(
          CONFLICT,
          "Username already exists"
        );
      }

      const user1 = await new User().findOne({ email: props.email });

      if(user1){
        return this.createError(
          CONFLICT,
          "Email address already exists"
        );
      }

      const newUser = await new User().create({
        email: props.email,
        password: props.password,
        username: props.username
      });

      const getUser = await new User().findOne({id:newUser[0]});

      console.log(newUser);
      console.log(getUser);

      const getAccessToken = await this.generateToken(getUser.id);
      this.accessToken = getAccessToken.access_token;

      console.log("gene1 "+ getAccessToken + " as :: " + this.accessToken);

      this.authenticationSuccessful("Registration successful",getUser);
    }
  }
  
  export default AuthController;
  