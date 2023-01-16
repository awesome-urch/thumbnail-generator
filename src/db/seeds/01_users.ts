"use strict";

import UserModel from "../../server/models/user";

const User = new UserModel();

exports.seed = async knex => {
  try {
    await knex(User.tableName).del();
    const newUsers = [
      {
        username: "user1",
        password: "password1",
        email: "user1@email.com"
      },
      {
        username: "user2",
        password: "password2",
        email: "user2@email.com"
      }
    ];
    Promise.all(newUsers.map(user => User.create(user)));
  } catch (err) {
    console.log("err: ", err);
  }
};

