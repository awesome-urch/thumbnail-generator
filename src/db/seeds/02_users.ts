"use strict";

import * as Knex from "knex";
import { knexDb } from "../../config/database";
import UserModel from "../../server/models/user";

const User = new UserModel();

export async function seed(): Promise<any> {
    // Deletes ALL existing entries
    await knexDb(User.tableName).del();
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
}

