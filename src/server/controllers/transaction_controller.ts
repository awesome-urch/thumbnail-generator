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

  generateReference(){
    return (Math.random() + 1).toString(36).substring(2);
  }

  async credit() {
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

    const user = await User.findOne({ id: this.req.body.user_id });
    if(!user) return this.next(createError({
      status: UNAUTHORIZED,
      message: "Invalid user"
    }));

    const wallet = await Wallet.findOne({ user_id: props.user_id });
    if(!wallet) return this.next(createError({
      status: CONFLICT,
      message: "User has not created wallet account"
    }));

    if(!props.transaction_reference){
      props.transaction_reference = this.generateReference();
      const checkReference = await Transaction.findOne({ transaction_reference: props.transaction_reference });

      while(checkReference){
        props.transaction_reference = this.generateReference();
      }
    }

    const newBalance = parseFloat(wallet.balance) + parseFloat(props.amount); //.toFixed(2)

    console.log(newBalance);

    props.balance = newBalance;

    const newTransaction = await Transaction.create(props);
    if(!newTransaction){
      return this.next(createError({
        status: UNPROCESSABLE,
        message: "An error occurred"
      }));
    }

    console.log(newTransaction);
    console.log(Transaction.selectableProps);

    await Wallet.update(wallet.id,{ balance: newBalance });

    this.res.json({
      ok: true,
      message: "Wallet credited successfully",
      newTransaction
    });
  }

  


  async debit() {
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
  
    await this.checkUser();
  
    const wallet = await Wallet.findOne({ user_id: props.user_id });
    if(!wallet) return this.next(createError({
      status: CONFLICT,
      message: "User has not created wallet account"
    }));
  
    if(!props.transaction_reference){
      props.transaction_reference = this.generateReference();
      const checkReference = await Transaction.findOne({ transaction_reference: props.transaction_reference });
  
      while(checkReference){
        props.transaction_reference = this.generateReference();
      }
    }
  
    const newBalance = parseFloat(wallet.balance) - parseFloat(props.amount);
  
    props.balance = newBalance;
  
    const newTransaction = await Transaction.create(props);
    if(!newTransaction){
      return this.next(createError({
        status: UNPROCESSABLE,
        message: "An error occurred"
      }));
    }
  
    await Wallet.update(wallet.id,{ balance: newBalance });
  
    this.res.json({
      ok: true,
      message: "Wallet debited successfully",
      newTransaction
    });
  }
  



}

  
export default TransactionController;
  