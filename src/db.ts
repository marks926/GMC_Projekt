import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: 'root', //process.env.DB_USER,
  password: 'campus02', //process.env.DB_PWD,
  database: process.env.DB_NAME,
  multipleStatements: true,
  port: 3306
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});