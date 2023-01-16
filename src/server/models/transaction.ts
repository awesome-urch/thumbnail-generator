import BaseModel from "./base";

class TransactionModel extends BaseModel {
  constructor() {
    super("Transaction", "transactions", [
      "id",
      "user_id",
      "amount",
      "balance",
      "transaction_type",
      "transaction_reference",
      "reason",
      "updated_at",
      "created_at"
    ]);
  }

}

const Transaction = new TransactionModel;

export default Transaction;

