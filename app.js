import express from'express';
import mongoose from'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv'
dotenv.config();
import AuthRoutes from './routes/auth.routers.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import TasksRoutes from './routes/tasks.routers.js'
mongoose.connect('mongodb://localhost/taskList')
const port = process.env.PORT  || 3000;
const app = express();



app.use(cookieParser());
app.use(cors({
origin:['http://localhost:5500',
    'http://127.0.0.1:5500'
],
credentials:true,
}))

app.use(session({
    secret: process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl: 'mongodb://localhost/taskList',
        collectionName:'sessions',
    }),
    cookie:{
secure:false,
httpOnly:true,
sameSite: 'lax',
    },
   
}));


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api',AuthRoutes());
app.use('/api',TasksRoutes());
app.get('/',(req,res)=>{
res.send('welcome')
});

app.listen(port,()=>{
    console.log(`running on port ${port}`);
});