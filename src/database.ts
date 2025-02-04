import { Knex, knex, Client} from "knex";

export const config = knex({
    client: 'sqlite3',
    connection: {
        filename: './db/api_db.db'
    }
})

