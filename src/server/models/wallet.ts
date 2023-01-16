import BaseModel from "./base";


class WalletModel extends BaseModel {
  constructor() {
    super("Wallet", "wallets", [
      "id",
      "user_id",
      "balance",
      "updated_at",
      "created_at"
    ]);
  }

}

const Wallet = new WalletModel;

export default Wallet;

