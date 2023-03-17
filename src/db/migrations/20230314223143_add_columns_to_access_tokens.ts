import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.alterTable("access_tokens", (table) => {
        table.timestamp("access_token_expires_on");
        table.integer("client_id").unsigned();
        table.string("refresh_token");
        table.timestamp("refresh_token_expires_on");
      });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.createTable("access_tokens", function (table) {
        table.increments("id").primary().unsigned();
        table.integer("user_id").unsigned();
        table.string("access_token");
        table.timestamp("access_token_expires_on");
        table.integer("client_id").unsigned();
        table.string("refresh_token");
        table.timestamp("refresh_token_expires_on");
      });
}

