
import { Router } from "express";
import bcrypt from "bcrypt";
// import db from "../db.js";
import jwt from "jsonwebtoken";
import pool from "../database/db.js";

export const userRegister = async (req, res) => {
  const { email, password,firstname,lastname } = req.body;
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

    const insert = `INSERT INTO userdata (email,password,firstname,lastname) VALUES ($1,$2,$3,$4) RETURNING id`;
    const result = await pool.query(insert, [email, hashPassword,firstname,lastname]);
    console.log(result);

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
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // const getUser = db.prepare("SELECT * FROM users WHERE username=(?)");
    // const user = getUser.run(email);
    const getUser = `SELECT * FROM userdata WHERE email=$1`;
    const user = await pool.query(getUser, [email]);
    console.log(user);
    console.log(user.password);

    if (user.rows.length === 0) {
      return res.status(404).send({ message: "user not found" });
    }

    const passwordValid = await bcrypt.compare(password, user.rows[0].password);

    if (!passwordValid) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
};

export const userDashboard = async (req, res) => {
  try {
    const checkid = `SELECT * FROM userdata WHERE id =$1`;
    const result = await pool.query(checkid, [req.userId]);

    if (result.rows.length === 0) {
      return res.status(500).json({ error: "user not existed" });
    }
    return res.status(201).json({ user: result });
  } catch (err) {
    console.error("Error in /dashboard:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const userBookmarking=async(req,res)=>{
  console.log(req.userId)
    console.log(req.body)
    try{
        const bookmark = `INSERT INTO bookmark (userdata_id,scholarship_id) VALUES ($1,$2) RETURNING id`;
        const data=pool.query(bookmark,[req.userId,req.body.bookmark_id])

        console.log(data);
        res.send("successfull",data)
    }
    catch(err){
      console.log(err.message)
    }
}

export const userBookmarks=async(req,res)=>{
    try{
       const result=
       `SELECT 
     c.name AS country_name, 
     u.name AS university_name, 
     s.name AS scholarship_name,
     s.degree,s.eligible,s.amount,s.deadline,s.link,s.criteria,s.id
     FROM  
     country c JOIN university u ON c.id=u.country_id 
     JOIN scholarship s ON u.id=s.university_id
     WHERE s.id IN ( select scholarship_id from bookmark where userdata_id= $1)`
     const data=await pool.query(result,[req.userId])
     console.log(data)
     res.send(data.rows)
    }
    catch(err){
       console.log(err.message)
    }
}

export const userRemoveBookmark = async (req, res) => {
  try {
    const removeBookmark = `DELETE FROM bookmark WHERE userdata_id=$1 AND scholarship_id=$2 `;
    const qeury =await pool.query(removeBookmark, [
      req.userId,
      req.body.bookmark_id,
    ]);

    res.send("successufully deleted", qeury);
  } catch (err) {
    console.log(err.message);
  }
};

export const getUser=async(req,res)=>{
       try{
          const checkid=`SELECT * FROM userdata WHERE id=$1`;
          const result=await pool.query(checkid,[req.userId]);
          if(result.rows.length===0){
            
            return res.status(500).json({error:"user not exist"})
          }
          
          // removing password before sending response
          const { password, ...userWithoutPassword } = result.rows[0];
          return res.status(201).json({ user: userWithoutPassword });
       }
       catch(err){
        return res.status(500).json({message:"server error"})
       }
}

export const postProfile=async(req,res)=>{
  console.log(req.body)
  const  {age,gender,category,income,disability_status,current_education_level,course_name,institution_name,cgpa,education_stream,year_of_study,
    passed_last_exam,
    certificates,
    entrance_exam_scores,
    research_experience,
    portfolio,
    state,
    district,
    residency_status}=req.body;
     try{
      const insertProfile = `
        INSERT INTO user_profile (
          user_id,
          age,
          gender,
          category,
          income,
          disability_status,
          current_education_level,
          course_name,
          institution_name,
          cgpa,
          education_stream,
          year_of_study,
          passed_last_exam,
          certificates,
          entrance_exam_scores,
          research_experience,
          portfolio,
          state,
          district,
          residency_status
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
        ) RETURNING id
      `;

      console.log(typeof age)
      const values = [
        req.userId,
        parseInt(age),
        gender,
        category,
        parseInt(income),
        disability_status,
        current_education_level,
        course_name,
        institution_name,
        parseFloat(cgpa),
        education_stream,
        parseInt(year_of_study),
        passed_last_exam,
        JSON.stringify(certificates),
        JSON.stringify(entrance_exam_scores),
        research_experience,
        portfolio,
        state,
        district,
        residency_status,
      ];

      const result = await pool.query(insertProfile, values);

      if (result.rows.length === 0) {
        return res.status(500).json({ error: "Failed to save profile" });
      }
      console.log(result.rows[0])

      return res.status(201).json({ message: "Profile saved successfully", profileId: result.rows[0].id ,profile:result.rows[0]});
     }
     catch(err){
      console.log(err.message)
       return res.status(500).json({ message: "server error" });
     }
}

export const userProfile=async(req,res)=>{
   const userId=req.userId;
  try{
    const getProfile=`SELECT * FROM user_profile WHERE user_id=$1`;
    const result=await pool.query(getProfile,[userId]);
    if(result.rows.length===0){
      return res.status(404).json({error:"Profile not found"});
    }
    return res.status(200).json({profile:result.rows[0]})
    
  }
  catch(err){
    console.log(err.message);
    return res.status(500).json({message:"server error"});
  }
}