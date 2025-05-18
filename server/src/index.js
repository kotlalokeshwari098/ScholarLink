import express from 'express'
import cors from 'cors'
import route from './routes/authRoutes.js';
import pool from './database/db.js';

const app=express();
app.use(express.json());
app.use(cors())
const PORT=process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send('hello');
})
app.get('/scholarships',async (req,res)=>{
     const result = `
       SELECT 
      c.name AS country_name, 
      u.name AS university_name, 
      s.name AS scholarship_name,
      s.degree,s.eligible,s.amount,s.deadline,s.link,s.id
      FROM  
      country c JOIN university u ON c.id=u.country_id 
      JOIN scholarship s ON u.id=s.university_id order by id
`;
    const resul=await pool.query(result)
    console.log(resul)
    res.json(resul)
})

app.get('/scholarshiplist/:id',async (req,res)=>{
  const id=req.params.id
  console.log(id)
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
    const resul=await pool.query(result,[id])
    console.log(resul)
    res.json(resul)
})

app.get('/scholarshipfilter',async (req,res)=>{
    const {country,university,degree}=req.query;
    console.log(country,university,degree);
    const result = `SELECT 
      c.name AS country_name, 
      u.name AS university_name, 
      s.name AS scholarship_name,
      s.degree,s.eligible,s.amount,s.deadline,s.link
      FROM country c 
      JOIN university u ON c.id = u.country_id  
      JOIN scholarship s ON u.id = s.university_id where c.name=$1 and u.name=$2 and s.degree=$3`;
      const resu=await pool.query(result,[country,university,degree])

      res.json(resu)
})



app.use('/auth',route)


app.listen(PORT ,()=>console.log(`listening on port ${PORT}`))