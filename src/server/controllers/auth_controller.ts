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

          this.res.json({
            ok: true,
            message: "Login successful",
            data:{user:user,token:getAccessToken}
          });
        }
      }catch(err){
        this.next(createError({
              status: UNAUTHORIZED,
              message: err
            }));
      }
    }

    async postRegister() {
      const props = this.req.body;

      if (!props.username || !props.password){
        return this.next(createError({
          status: BAD_REQUEST,
          message: "`username` + `password` are required fields"
        }));
      }

      const user = await new User().findOne({ username: props.username });
      if(user) return this.next(createError({
        status: CONFLICT,
        message: "Username already exists"
      }));

      const newUser = await new User().create(props);

      const getUser = await new User().findOne({id:newUser[0]});

      console.log(newUser);
      console.log(getUser);

      const getAccessToken = await this.generateToken(getUser.id);

      this.res.json({
        ok: true,
        message: "Registration successful",
        data:{user:getUser,token:getAccessToken}
      });
    }
  }
  
  export default AuthController;
  