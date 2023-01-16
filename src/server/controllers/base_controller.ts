import Wallet from "../models/wallet";
import User from "../models/user";
import {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} from "../helpers/error_helper";


class BaseController {

  res: any;
  req: any;
  next: any;
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async checkUser(){
    const user = await User.findOne({ id: this.req.body.user_id });
    if(!user) return this.next(createError({
      status: UNAUTHORIZED,
      message: "Invalid user"
    }));
  }

}
  
export default BaseController;
  