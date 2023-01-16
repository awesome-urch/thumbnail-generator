import BaseModel from "./base";

class TransferModel extends BaseModel {
  constructor() {
    super("Transfer", "transfers", [
      "id",
      "from",
      "to",
      "amount",
      "updated_at",
      "created_at"
    ]);
  }

}


export default TransferModel;

