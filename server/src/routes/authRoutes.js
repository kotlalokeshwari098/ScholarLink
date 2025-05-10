import { Router } from "express";
import bcrypt from "bcrypt";
// import db from "../db.js";
import jwt from "jsonwebtoken";
import pool from "../database/db.js";

const route = Router();

route.post("/register", async(req, res) => {
  const { email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 8);
 
  try {
    // check if email exits
    const checkEmail = `SELECT * FROM userdata WHERE email =$1`;
    const emailExists = await pool.query(checkEmail, [email]);

    if (emailExists.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "email already exists try another one" });
    }

    const insert = `INSERT INTO userdata (email,password) VALUES ($1,$2) RETURNING id`;
    const result = await pool.query(insert, [email, hashPassword]);
    console.log(result)

    // Ensure result.rows is not empty
    if (result.rows.length === 0) {
      return res.status(500).json({ error: "Failed to register user" });
    }

    // Check if the id is returned in result.rows[0]
    const userId = result.rows[0].id;
    if (!userId) {
      return res.status(500).json({ error: "User ID not found after insert" });
    }

    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ message: "registration successful", token });
  } catch (err) {
    console.log("Register Error:", err.message);
    res.sendStatus(503).json({ error: err.message });
  }
});

route.post("/login", (req, res) => {
  const { email, password } = req.body;

  try {
    // const getUser = db.prepare("SELECT * FROM users WHERE username=(?)");
    // const user = getUser.run(email);
    const getUser=`SELECT * FROM userdata WHERE email=$1`
    const user=pool.query(getUser,email);

    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    const passwordValid = bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.json({ token });
    
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

export default route;
