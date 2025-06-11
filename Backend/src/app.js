import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import userRouter from './routers/user.route.js';


const app=express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type','x-rapidapi-key','x-rapidapi-host']
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/user', userRouter)


export {app};