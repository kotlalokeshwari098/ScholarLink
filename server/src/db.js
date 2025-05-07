import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync(":memory:");

db.exec(`
    CREATE TABLE users(
      id INTEGER PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT  
    )  
`)

export default db;