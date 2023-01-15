"use strict";

import { hash as _hash, compare } from "bcrypt";
// import createGuts from "../helpers/model-guts";

import { knexDb } from "../../config/database";

//const bcrypt = require("bcrypt");
//const createGuts = require("../helpers/model-guts.ts");

const name = "User";
const tableName = "users";

// Properties that are allowed to be selected from the database for reading.
// (e.g., `password` is not included and thus cannot be selected)
const selectableProps = [
  "id",
  "username",
  "email",
  "updated_at",
  "created_at"
];

// Bcrypt functions used for hashing password and later verifying it.
const SALT_ROUNDS = 10;
const hashPassword = password => _hash(password, SALT_ROUNDS);
const verifyPassword = (password, hash) => compare(password, hash);


// Always perform this logic before saving to db. This includes always hashing
// the password field prior to writing so it is never saved in plain text.
const beforeSave = user => {
  if (!user.password) return Promise.resolve(user);

  // `password` will always be hashed before being saved.
  return hashPassword(user.password)
    .then(hash => ({ ...user, password: hash }))
    .catch(err => `Error hashing password: ${ err }`);
};

// export default knex => {
//   const guts = createGuts({
//     knex,
//     name,
//     tableName,
//     selectableProps
//   });

//   // Augment default `create` function to include custom `beforeSave` logic.
//   const create = props => beforeSave(props)
//     .then(user => guts.create(user));

//   const verify = async (username, password) => {
//     const matchErrorMsg = "Username or password do not match";

//     const user = await knex.select()
//     .from(tableName)
//     .where({ username })
//     .timeout(guts.timeout);

//     if (!user.length) throw matchErrorMsg;

//     const [isMatch] = await Promise.all([verifyPassword(password, user[0].password)]);

//     if (!isMatch) throw matchErrorMsg;

//     return user;

//   };

//   return {
//     ...guts,
//     create,
//     verify
//   };
// };

const timeout = 1000;
const knex = knexDb("users");

const create = async (props) => {

  const user = await beforeSave(props);

  delete props.id; // not allowed to set `id`

  return knex.insert(user)
    .returning(selectableProps)
    .into(tableName)
    .timeout(timeout);
};

const findAll = () => knex.select(selectableProps)
    .from(tableName)
    .timeout(timeout);

  const find = filters => knex.select(selectableProps)
    .from(tableName)
    .where(filters)
    .timeout(timeout);

  // Same as `find` but only returns the first match if >1 are found.
  const findOne = filters => find(filters)
    .then(results => {
      if (!Array.isArray(results)) return results;
      return results[0];
    });

  const findById = id => knex.select(selectableProps)
    .from(tableName)
    .where({ id })
    .timeout(timeout);

  const update = (id, props) => {
    delete props.id; // not allowed to set `id`

    return knex.update(props)
      .from(tableName)
      .where({ id })
      .returning(selectableProps)
      .timeout(timeout);
  };

  const updateRange = (options, props) => {
    delete props.id; // not allowed to set `id`

    return knex.update(props)
      .from(tableName)
      .where(options.col,options.symbol,options.val)
      .returning(selectableProps)
      .timeout(timeout);
  };

  const destroy = id => knex.del()
    .from(tableName)
    .where({ id })
    .timeout(timeout);


  const verify = async (username, password) => {
    const matchErrorMsg = "Username or password do not match";

    const user = await knex.select()
    .from(tableName)
    .where({ username })
    .timeout(timeout);

    if (!user.length) throw matchErrorMsg;

    const [isMatch] = await Promise.all([verifyPassword(password, user[0].password)]);

    if (!isMatch) throw matchErrorMsg;

    return user;

  };

    // Augment default `create` function to include custom `beforeSave` logic.
 

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



// const User = initModel(knexDb);