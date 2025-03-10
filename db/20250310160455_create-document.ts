import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("meals", (table) => {
    table.uuid("id").primary();
    table.string("name");
    table.string("description");
    table.boolean("Within diet");
    table.date("date").nullable();
    table.time("time").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.uuid("session_id").index();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("meals");
}
