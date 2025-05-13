// import { DatabaseSync } from "node:sqlite";
// const db = new DatabaseSync(":memory:");

// db.exec(`
//     CREATE TABLE users(
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       username TEXT UNIQUE,
//       password TEXT  
//     )  
// `)

// export default db;

import {Pool} from 'pg'
import dotenv from "dotenv";
dotenv.config();

const pool=new Pool({
   host:process.env.HOSTNAME,
   user:process.env.USERNAME_DB,
   port:process.env.PORT_NUMBER,
   password:process.env.PASSWORD,
   database:process.env.DATABASE_NAME
})

pool.connect().then(()=>console.log("connected"))

export default pool