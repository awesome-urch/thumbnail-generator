"use strict";

import * as Knex from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: {
      database: "demo_credit", //process.env.DATABASE_NAME
      user:     "root",
      password: ""
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${ __dirname }/src/db/migrations`
    },
    seeds: {
      directory: `${ __dirname }/src/db/seeds`
    }
  },
  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user:     "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user:     "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};

module.exports = config;

