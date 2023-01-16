import { hash as _hash, compare } from "bcrypt";
import BaseModel from "./base";

const SALT_ROUNDS = 10;
const hashPassword = password => _hash(password, SALT_ROUNDS);
const verifyPassword = (password, hash) => compare(password, hash);

class UserModel extends BaseModel {
  constructor() {
    super("User", "users", [
      "id",
      "username",
      "email",
      "updated_at",
      "created_at"
    ]);
  }

  beforeSave(data) {
    console.log(data);
    if (!data.password) return Promise.resolve(data);
    return hashPassword(data.password)
      .then(hash => ({ ...data, password: hash }))
      .catch(err => `Error hashing password: ${ err }`);
  }

  async create(props) {
    const user = await this.beforeSave(props);
    delete props.id; // not allowed to set `id`
    return this.knexInstance.insert(user).returning("*").timeout(this.timeout);
  }

  async verify(username, password){
    const matchErrorMsg = "Username or password do not match";

    const user = await this.knexInstance.select()
    .from(this.tableName)
    .where({ username })
    .timeout(this.timeout);

    console.log("user coming");
    console.log(username);

    if (!user.length) throw matchErrorMsg;

    const [isMatch] = await Promise.all([verifyPassword(password, user[0].password)]);

    if (!isMatch) throw matchErrorMsg;

    return user;
  }

}

export default UserModel;

