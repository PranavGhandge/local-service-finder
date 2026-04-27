import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Hacker",
  database: "local_service",
  waitForConnections: true,
  connectionLimit: 10,
});