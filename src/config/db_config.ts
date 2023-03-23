"use strict";

const config = {
  development: {
    client: "mysql",
    connection: {
      database: "demo_credit", //process.env.DATABASE_NAME //autodpom_openthumbnail
      user:     "root", //autodpom_openthumbnail_user
      password: "" //7JuzVqSS{yiR
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "src/db/migrations",
      // directory: `${ __dirname }/src/db/migrations`
    },
    seeds: {
      directory: "src/db/seeds",
      // directory: `${ __dirname }/src/db/seeds`
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

export { config };


