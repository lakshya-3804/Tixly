import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import userRouter from './routers/user.route.js';
import flightRouter from './routers/flight.route.js';
import trainRouter from './routers/train.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, '../../Frontend/dist')

const whitelist = ['http://localhost:5173', 'https://tixly-seven.vercel.app' , 'https://tixly-1.onrender.com'];

const app=express();
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET','POST','OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type','x-rapidapi-key','x-rapidapi-host']
}));
app.options('*', cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(express.static('public'));
app.use(cookieParser());
app.use('/api/user', userRouter)
app.use('/api/train', trainRouter);
app.use('/api/flight', flightRouter);

app.use(express.static(clientDist)); // Serve static files from the client build directory


if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.get('*', (req, res) => {
        res.sendFile(path.join(clientDist, 'index.html'));
    });
} else {
    // If Frontend/dist doesn't exist, just serve the API
    console.log('Frontend build not found. Running in API-only mode.');
}


export {app};
