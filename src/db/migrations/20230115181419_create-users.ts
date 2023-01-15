import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", function (table) {
        table.increments("id").primary().unsigned();
        table.string("username").unique().index();
        table.string("password");
        table.string("email").unique().index();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

