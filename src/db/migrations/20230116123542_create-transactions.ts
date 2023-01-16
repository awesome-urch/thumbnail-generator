import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    
    return knex.schema.createTable("transactions", function (table) {
        table.increments("id").primary().unsigned();
        table.integer("user_id").unsigned();
        table.decimal("amount");
        table.decimal("balance");
        table.string("transaction_type");
        table.string("transaction_reference");
        table.text("reason");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.foreign("user_id").references("Users.id");
      });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable("transactions");
}

