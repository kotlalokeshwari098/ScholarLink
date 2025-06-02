import pool from "../database/db.js";

export const getScholarships = async (req, res) => {
  const data = `
    SELECT 
   c.name AS country_name, 
   u.name AS university_name, 
   s.name AS scholarship_name,
   s.degree,s.eligible,s.amount,s.deadline,s.link,s.id
   FROM  
   country c JOIN university u ON c.id=u.country_id 
   JOIN scholarship s ON u.id=s.university_id order by id
`;
  const result = await pool.query(data);
  console.log(result);
  res.json(result);
};

export const getScholarshipById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const result = `
      SELECT 
      c.name AS country_name, 
      u.name AS university_name, 
      s.name AS scholarship_name,
      s.degree,s.eligible,s.amount,s.deadline,s.link,s.criteria
      FROM  
      country c JOIN university u ON c.id=u.country_id 
      JOIN scholarship s ON u.id=s.university_id
      WHERE s.id=$1`;
  const resul = await pool.query(result, [id]);
  console.log(resul);
  res.json(resul);
};

export const getScholarshipByFilter = async (req, res) => {
  const { country, university, degree } = req.query;
  console.log(country, university, degree);
  const result = `SELECT 
    c.name AS country_name, 
    u.name AS university_name, 
    s.name AS scholarship_name,
    s.degree,s.eligible,s.amount,s.deadline,s.link
    FROM country c 
    JOIN university u ON c.id = u.country_id  
    JOIN scholarship s ON u.id = s.university_id where c.name=$1 and u.name=$2 and s.degree=$3`;
  const resu = await pool.query(result, [country, university, degree]);

  res.json(resu);
};