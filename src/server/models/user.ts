import { hash as _hash, compare } from "bcrypt";
import { knexDb } from "../../config/database";

const name = "User";
const tableName = "users";
const selectableProps = [
  "id",
  "username",
  "email",
  "updated_at",
  "created_at"
];
const SALT_ROUNDS = 10;
const hashPassword = password => _hash(password, SALT_ROUNDS);
const verifyPassword = (password, hash) => compare(password, hash);
const beforeSave = user => {
  console.log(user);
  if (!user.password) return Promise.resolve(user);
  return hashPassword(user.password)
    .then(hash => ({ ...user, password: hash }))
    .catch(err => `Error hashing password: ${ err }`);
};
const timeout = 1000;
const knexInstance = knexDb("users");
const create = async (props) => {
  const user = await beforeSave(props);
  delete props.id; // not allowed to set `id`
  return knexInstance.insert(user).returning("*").timeout(timeout);
};

const findAll = () => knexInstance.select(selectableProps)
    .from(tableName)
    .timeout(timeout);

  const find = filters => knexInstance.select(selectableProps)
    .from(tableName)
    .where(filters)
    .timeout(timeout);

  // Same as `find` but only returns the first match if >1 are found.
  const findOne = filters => find(filters)
    .then(results => {
      if (!Array.isArray(results)) return results;
      return results[0];
    });

  const findById = id => knexInstance.select(selectableProps)
    .from(tableName)
    .where({ id })
    .timeout(timeout);

  const update = (id, props) => {
    delete props.id; // not allowed to set `id`

    return knexInstance.update(props)
      .from(tableName)
      .where({ id })
      .returning(selectableProps)
      .timeout(timeout);
  };

  const updateRange = (options, props) => {
    delete props.id; // not allowed to set `id`

    return knexInstance.update(props)
      .from(tableName)
      .where(options.col,options.symbol,options.val)
      .returning(selectableProps)
      .timeout(timeout);
  };

  const destroy = id => knexInstance.del()
    .from(tableName)
    .where({ id })
    .timeout(timeout);


  const verify = async (username, password) => {
    const matchErrorMsg = "Username or password do not match";

    const user = await knexInstance.select()
    .from(tableName)
    .where({ username })
    .timeout(timeout);

    if (!user.length) throw matchErrorMsg;

    const [isMatch] = await Promise.all([verifyPassword(password, user[0].password)]);

    if (!isMatch) throw matchErrorMsg;

    return user;

  }; 

export const User = {
  name: "User",
  tableName: "users",
  selectableProps: [ "id", "username", "email", "updated_at", "created_at" ],
  timeout: 1000,
  verify,
  create,
  findAll,
  find,
  findOne,
  findById,
  update,
  updateRange,
  destroy
};

