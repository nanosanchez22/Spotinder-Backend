const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: process.env.DB_PASSWORD,
    database: "postgres",
  },
});

module.exports = knex;
