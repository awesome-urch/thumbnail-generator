import Wallet from "../models/wallet";
import User from "../models/user";
import Transaction from "../models/transaction";
import {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT,
  UNPROCESSABLE
} from "../helpers/error_helper";
import BaseController from "./base_controller";

class TransactionController extends BaseController {

  async performTransaction(transactionType) {
    const props = this.req.body;

    if (!props.user_id || !props.amount ){
      return this.next(createError({
        status: BAD_REQUEST,
        message: "`user_id` and `amount` are required"
      }));
    }

    if(isNaN(props.amount)){
      return this.next(createError({
        status: BAD_REQUEST,
        message: "`amount` is invalid"
      }));
    }

    const user = await new User().findOne({ id: props.user_id });
    if(!user) return this.next(createError({
      status: UNAUTHORIZED,
      message: "Invalid user"
    }));

    const wallet = await new Wallet().findOne({ user_id: props.user_id });
    if(!wallet) return this.next(createError({
      status: CONFLICT,
      message: "User has not created wallet account"
    }));

    if(!props.transaction_reference){
      props.transaction_reference = this.generateReference();
      const checkReference = await new Transaction().findOne({ transaction_reference: props.transaction_reference });

      while(checkReference){
        props.transaction_reference = this.generateReference();
      }
    }

    let newBalance;
    if (transactionType === "credit") {
      newBalance = parseFloat(wallet.balance) + parseFloat(props.amount);
    } else if (transactionType === "debit") {
      newBalance = parseFloat(wallet.balance) - parseFloat(props.amount);
    }

    props.balance = newBalance;
    props.transaction_type = transactionType;

    const newTransaction = await new Transaction().create(props);
    if(!newTransaction){
      return this.next(createError({
        status: UNPROCESSABLE,
        message: "An error occurred"
      }));
    }

    console.log(newTransaction);
    console.log(new Transaction().selectableProps);

    await new Wallet().update(wallet.id,{ balance: newBalance });

    this.res.json({
      ok: true,
      message: "Wallet credited successfully",
      newTransaction
    });
  }

  async credit(){
    this.performTransaction("credit");
  }

  async debit(){
    this.performTransaction("debit");
  }
}

  
export default TransactionController;
  