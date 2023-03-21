import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    // return knex.schema.createTable("oauth_clients", function (table) {
    //     table.increments("id").primary().unsigned();
    //     table.integer("client_id").unsigned();
    //     table.string("client_secret");
    //     // table.foreign("client_id").references("access_tokens.client_id");
    //   });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable("oauth_clients");
}
