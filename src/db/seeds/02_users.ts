"use strict";

import * as Knex from "knex";
import { knexDb } from "../../config/database";
import User from "../../server/models/user";

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



/*
import * as Knex from "knex";

// import { knexDb } from "../../config/database";
import { User } from "../../server/models/user";

export async function seed(knexDb): Promise<any> {
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

    // return knex(User.tableName).del()
    //     .then(() => {
    //         // Inserts seed entries
    //         return knex("table_name").insert([
    //             {
    //                 username: "user1",
    //                 password: "password1",
    //                 email: "user1@email.com"
    //                 },
    //                 {
    //                 username: "user2",
    //                 password: "password2",
    //                 email: "user2@email.com"
    //             }
    //         ]);
    //     });
}

*/
