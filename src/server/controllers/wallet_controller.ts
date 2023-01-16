import Wallet from "../models/wallet";
import User from "../models/user";
import {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} from "../helpers/error_helper";

const INITIAL_TRANSACTION_TYPE = "initial";

class WalletController {

  res: any;
  req: any;
  next: any;
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async createWallet() {
    const props = this.req.body;
    props.transaction_type = INITIAL_TRANSACTION_TYPE;

    if (!props.user_id ){
      return this.next(createError({
        status: BAD_REQUEST,
        message: "`user_id` is required"
      }));
    }

    const user = await User.findOne({ id: props.user_id });
    if(!user) return this.next(createError({
      status: UNAUTHORIZED,
      message: "Invalid user"
    }));

    const wallet = await Wallet.findOne({ user_id: props.user_id });
    if(wallet) return this.next(createError({
      status: CONFLICT,
      message: "User wallet already exists"
    }));

    const newWallet = await Wallet.create(props);

    this.res.json({
      ok: true,
      message: "Wallet created successfully",
      newWallet
    });
  }
}

  
  export default WalletController;
  