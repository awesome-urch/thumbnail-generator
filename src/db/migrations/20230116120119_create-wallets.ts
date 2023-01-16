import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable("wallets", function (table) {
        table.increments("id").primary().unsigned();
        table.integer("user_id").unsigned();
        table.string("transaction_type");
        table.decimal("balance");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.foreign("user_id").references("Users.id");
      });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable("wallets");
}

