import { knex as setupknex, Knex } from "knex";

export const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./db/daily_api.db",
  },
  useNullAsDefault: true,

  migrations: {
    extension: "ts",
    directory: "./db",
  },
};
export const knex = setupknex(config);
