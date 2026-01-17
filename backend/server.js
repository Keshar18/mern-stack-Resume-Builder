import express from  'express'
import cors from 'cors'
import 'dotenv/config'


const app = express();
const PORT=4000;
app.use(cors());

//now connect to database
//middleware

app.use(express.json());

//Routes
app.get('/', (req,res)=>{
    res.send('API is running....')
})

app.listen(PORT, ()=>{
    console.log("server started on http://localhost:${PORT}");
})