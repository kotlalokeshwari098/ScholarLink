import express from 'express'
import cors from 'cors'
import route from './middleware/authmiddleware';

const app=express();
app.use(cors())
const PORT=process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send('hello');
})

app.use('/auth',route)

app.listen(PORT ,()=>console.log(`listening on port ${PORT}`))