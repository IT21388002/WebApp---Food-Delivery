import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';


//app config
const app = express();
const port = 4000

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

app.get('/',(req,res)=>{
    res.send("API Working")
})

//api endpoints
app.use('/api/food', foodRouter)

//listen
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://pawarahasamal22:8gfbzqHp6iyFhxYL@cluster0.y3t9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0