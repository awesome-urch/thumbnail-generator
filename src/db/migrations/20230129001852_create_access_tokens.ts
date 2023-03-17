import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable("access_tokens", function (table) {
        table.increments("id").primary().unsigned();
        table.integer("user_id").unsigned();
        table.string("access_token");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.foreign("user_id").references("Users.id");
      });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable("access_tokens");
}

