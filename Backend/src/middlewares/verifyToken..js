import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        if (!token){
            return res.status(403).json({ error: 'No token provided' });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err){
                throw new ApiError(500,"Invalid Authorization");
            }
            req.user = user; // creating user object for next function 
            next(); // passing to next function which will handle it
        });
    } catch (error) {
        throw new ApiError(500 , error?.message || "Invalid access token");
    }
};