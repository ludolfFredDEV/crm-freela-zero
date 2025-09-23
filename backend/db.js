const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "crm_db",
  password: "joao",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
