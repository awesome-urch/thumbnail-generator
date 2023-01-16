import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    
    return knex.schema.createTable("transfers", function (table) {
        table.increments("id").primary().unsigned();
        table.integer("from").unsigned();
        table.integer("to").unsigned();
        table.decimal("amount");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.foreign("from").references("Users.id");
        table.foreign("to").references("Users.id");
      });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable("transfers");
}

