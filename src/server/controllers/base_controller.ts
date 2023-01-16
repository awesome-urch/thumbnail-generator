import User from "../models/user";
import {
  createError,
  UNAUTHORIZED} from "../helpers/error_helper";


class BaseController {

  res: any;
  req: any;
  next: any;
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  generateReference(){
    return (Math.random() + 1).toString(36).substring(2);
  }

  async checkUser(){
    const user = await new User().findOne({ id: this.req.body.user_id });
    if(!user) return this.next(createError({
      status: UNAUTHORIZED,
      message: "Invalid user"
    }));

    return user;
  }

}
  
export default BaseController;
  