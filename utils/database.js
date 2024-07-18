import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

let pool;

// digital ocean
export async function connect() {
  let cString =
      "mysql://" +
      process.env.DO_USER +
      ":" +
      process.env.DO_PASSWORD +
      "@" +
      process.env.DO_HOST +
      ":" +
      process.env.DO_PORT +
      "/" +
      process.env.DO_DATABASE;
      pool = mysql.createPool(
        cString // digital ocean sql server
      ).promise();
}

// SQL
// export async function connect() {
//     let cString =
//         "mysql://" +
//         process.env.MYSQL_USER +
//         ":" +
//         process.env.MYSQL_PASSWORD +
//         "@" +
//         process.env.MYSQL_HOST +
//         ":" +
//         process.env.MYSQL_PORT +
//         "/" +
//         process.env.MYSQL_DATABASE;
//         pool = mysql.createPool(
//           {
//             host: process.env.MYSQL_HOST,
//             user: process.env.MYSQL_USER,
//             password: process.env.MYSQL_PASSWORD,
//             database: process.env.MYSQL_DATABASE,
//           }
//         ).promise();
// }

export async function getAllProjects() {
  const [rows] = await pool.query(`SELECT * FROM projects;`);
  return rows;
}
