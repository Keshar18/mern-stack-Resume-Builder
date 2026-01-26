import express from  'express'
import cors from 'cors'
import 'dotenv/config'
import {connectDB} from './config/db.js'
import userRouter from './routes/userRoutes.js'


import path from 'path';
import { fileURLToPath } from 'url';
import resumeRouter from './routes/resumeRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT=4000;
app.use(cors());

//now connect to database
connectDB();


//middleware
app.use(express.json());
app.use('/api/users', userRouter);


app.use(express.json());


app.use(
    '/uploads',
    express.static(path.join(__dirname, '/uploads'),{
        setHeaders: (res, path)=>{
            res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
        }
    })
)

//Routes
app.get('/', (req,res)=>{
    res.send('API is running....')
})

app.listen(PORT, ()=>{
    console.log(`server started on http://localhost:${PORT}`);
})