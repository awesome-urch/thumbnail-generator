import Wallet from "../models/wallet";
import User from "../models/user";
import Transaction from "../models/transaction";
import Transfer from "../models/transfer";
import {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  UNPROCESSABLE
} from "../helpers/error_helper";
import BaseController from "./base_controller";

class TransferController extends BaseController {

  async transfer() {
    const props = this.req.body;

    if (!props.from || !props.to || !props.amount ){
      return this.next(createError({
        status: BAD_REQUEST,
        message: "`from`, `to` and `amount` are required"
      }));
    }

    if(isNaN(props.amount)){
      return this.next(createError({
        status: BAD_REQUEST,
        message: "`amount` is invalid"
      }));
    }

    if(this.checkAmount(props.amount) === false){
      return this.next(createError({
        status: BAD_REQUEST,
        message: "`amount` must be greater than 0"
      }));
    }

    const userFrom = await new User().findOne({ id: props.from });
    console.log(userFrom);
    if(!userFrom) return this.next(createError({
      status: UNAUTHORIZED,
      message: "Invalid sender"
    }));

    const userTo = await new User().findOne({ id: props.to });
    console.log(userTo);
    if(!userTo) return this.next(createError({
      status: UNAUTHORIZED,
      message: "Invalid receiver"
    }));

    const walletFrom = await new Wallet().findOne({ user_id: props.from });
    if(!walletFrom) return this.next(createError({
      status: UNPROCESSABLE,
      message: "Sender has not created wallet account"
    }));

    const walletTo = await new Wallet().findOne({ user_id: props.to });
    if(!walletTo) return this.next(createError({
      status: UNPROCESSABLE,
      message: "Receiver has not created wallet account"
    }));

    if(!props.transaction_reference){
      props.transaction_reference = this.generateReference();
      const checkReference = await new Transaction().findOne({ transaction_reference: props.transaction_reference });
      while(checkReference){
        props.transaction_reference = this.generateReference();
      }
    }

    if(this.balanceIsMoreThanAmount(walletFrom.balance,props.amount) === false){
      return this.next(createError({
        status: UNPROCESSABLE,
        message: "Insufficient funds"
      }));
    }

    const newSenderBalance = parseFloat(walletFrom.balance) - parseFloat(props.amount);
    const newReceiverBalance = parseFloat(walletTo.balance) + parseFloat(props.amount);
    await new Transaction().create({user_id: props.from, amount: props.amount, balance: newSenderBalance, transaction_type:"debit", transaction_reference: props.transaction_reference});
    await new Transaction().create({user_id: props.to, amount: props.amount, balance: newReceiverBalance, transaction_type:"credit", transaction_reference: props.transaction_reference});
    const newTransfer = await new Transfer().create({from: props.from, to: props.to, amount: props.amount});
    
    if(!newTransfer){
      return this.next(createError({
        status: UNPROCESSABLE,
        message: "An error occurred"
      }));
    }

    const getTransfer = await new Transfer().findOne({id:newTransfer[0]});

    await new Wallet().update(walletFrom.id,{ balance: newSenderBalance});
    await new Wallet().update(walletTo.id,{ balance: newReceiverBalance});

    this.res.json({
      ok: true,
      message: "Transfer successful",
      transaction: getTransfer
    });
  }

}

  
export default TransferController;
  