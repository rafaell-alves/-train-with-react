var knex= require("knex");
var dotenv = require("dotenv");

dotenv.config();

const conectionDb = knex({
  client: "pg",
  connection: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: false,
  },
});

module.exports = conectionDb;
