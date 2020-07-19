import knex from "knex";

const connection = knex({
  client: "mysql",
  connection: {
    host: "db-mysqlserver.mysql.database.azure.com",
    user: "LuanCloud@db-mysqlserver",
    password: "Alura!123",
    database: "dbmysql",
  },
});

export default connection;
