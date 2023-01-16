import knex from "knex";
import { config } from "./db_config";

const env = process.env.NODE_ENV || "development";
const knexDb = knex(config[env]);

export {
    knexDb
};
