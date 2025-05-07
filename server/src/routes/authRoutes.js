import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../db.js";
import jwt from "jsonwebtoken";

const route = Router();

route.post("/register", (req, res) => {
  const { email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 8);
  
  try {
    const insert = db.prepare(
      "INSERT INTO users(username,password) VALUES (?,?)"
    );

    const result = insert.run(email, hashPassword);

    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

route.post("/login", (req, res) => {
  const { email, password } = req.body;

  try {
    const getUser = db.prepare("SELECT * FROM users WHERE username=(?)");
    const user = getUser.run(email);

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
