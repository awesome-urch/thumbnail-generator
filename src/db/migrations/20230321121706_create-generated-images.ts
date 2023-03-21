import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable("generated_images", function (table) {
        table.increments("id").primary().unsigned();
        table.integer("user").unsigned();
        table.text("url");
        table.text("base64");
        table.integer("size");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.foreign("user").references("Users.id");
      });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable("generated_images");
}

