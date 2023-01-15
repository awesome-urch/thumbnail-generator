"use strict";

import knex from "knex";

// const env = process.env.NODE_ENV || "development";
// import { config } from "../db/knexfile";
// const knexDb = knex(config[env]);

export {
    knex as knexDb
};