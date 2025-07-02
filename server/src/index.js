import express from 'express'
import cors from 'cors'
import route from './routes/userRoutes.js';
import { getScholarshipByFilter, getScholarshipById, getScholarships } from './controllers/scholarshipController.js';

const app=express();
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_API_URL,
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

const PORT= 5000

app.get('/',(req,res)=>{
    res.send('hello');
})
app.get('/scholarships',getScholarships)

app.get('/scholarshiplist/:id',getScholarshipById)

app.get('/scholarshipfilter',getScholarshipByFilter)



app.use('/auth',route)


app.listen(PORT ,()=>console.log(`listening on port ${PORT}`))