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

const pool=new Pool({
   host:'localhost',
   user:"postgres",
   port:5432,
   password:"openliki09",
   database:"scholarlink"
})

pool.connect().then(()=>console.log("connected"))

export default pool