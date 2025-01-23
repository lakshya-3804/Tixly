import UserModel from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await UserModel.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken=refreshToken;
        await user.save({ validateBeforeSave: false });
        return {accessToken , refreshToken};
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500 , error.message );
    }   
}

export const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        console.log(username,email,password);
        // Check if all fields are filled
        if (!username || !email || !password) {
            throw new ApiError(400,"All required fields are not filled!!");
        }
        // Check if user already exists
        const existingUser = await UserModel.findOne({ $or:[{email},{username}] });
        if (existingUser) {
            throw new ApiError(400,"User already Exists!!");
        }
        // Encrypt password
        const hashedPass = bcrypt.hashSync(password, 10);
        // Create user entry in the database and create a JWT token for the user
        const user = await UserModel.create({ username, email, password: hashedPass });
        const registeredUser = await UserModel.findById(user._id).select("-password -refreshToken");
        if(!registeredUser){
            throw new ApiError(500,"Something went wrong in registering the user");
        }
        // res.status(201).json(new ApiResponse(201,"User Signed Up successfully !!"));
        const {accessToken , refreshToken} = await generateAccessAndRefreshToken(registeredUser._id);
        const SignedInUser = await UserModel.findById(registeredUser._id).select("-password -refreshToken");
        const cookieOptions = {httpOnly:true , secure:true};

        res
        .status(200)
        .cookie("accessToken" , accessToken , cookieOptions)
        .cookie("refreshToken" , refreshToken , cookieOptions)
        .json(new ApiResponse(201 ,{ user : SignedInUser , accessToken , refreshToken} , "User Signed Up successfully !!"));
        
    } catch (e) {
        throw new ApiError(500, error?.message || "Error occured while SignUp");
    }
};

export const signIn = async (req, res, next) => {
    try {
        const {email, password } = req.body;
        // check all fields are provided
        if(!email || !password){
            throw new Error("All fields are not filled!!");
        }
        // authentication using JWT token
        const validUser = await UserModel.findOne({email});
        if (!validUser) {
            throw new ApiError(404,"Not Found!!");
        }
        const isValid = validUser.isPasswordCorrect(password);
        if (!isValid) {
            throw new ApiError(400,"Invalid Password")
        }

        const {accessToken , refreshToken} = await generateAccessAndRefreshToken(validUser._id);
        const SignedInUser = await UserModel.findById(validUser._id).select("-password -refreshToken");
        const cookieOptions = {httpOnly:true , secure:true};

        res
        .status(200)
        .cookie("accessToken" , accessToken , cookieOptions)
        .cookie("refreshToken" , refreshToken , cookieOptions)
        .json(new ApiResponse(201 ,{ user : SignedInUser , accessToken , refreshToken} , "User Signed In successfully !!"));

    } catch (error) {
        throw new ApiError(500, error?.message || "Error occured while Signing In");
    }
};

export const googleSignUp= async(req , res , next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
          throw new ApiError(400,"User already exist");
        }
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
        const newUser = new UserModel({
          username:
            req.body.username.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-8),
          email: req.body.email,
          password: hashedPassword,
        });
        await newUser.save();
        const {accessToken , refreshToken} = await generateAccessAndRefreshToken(newUser._id);
        const SignedInUser = await UserModel.findById(newUser._id).select("-password -refreshToken");
        const cookieOptions = {httpOnly:true , secure:true};

        res
        .status(200)
        .cookie("accessToken" , accessToken , cookieOptions)
        .cookie("refreshToken" , refreshToken , cookieOptions)
        .json(new ApiResponse(201 ,{ user : SignedInUser , accessToken , refreshToken} , "User Signed In successfully !!"));
          
      } catch (error) {
        throw new ApiError(500, error?.message || "Error occured while Signing up with google");
      }
};

export const googleSignIn= async(req , res) => {
    try{
        const user = await UserModel.findOne({email:req.body.email});
        if(!user){
            throw new ApiError(400,"Invalid Password");
        }
        const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id);
        const SignedInUser = await UserModel.findById(user._id).select("-password -refreshToken");
        const cookieOptions = {httpOnly:true , secure:true , sameSite : 'None'};

        res
        .status(200)
        .cookie("accessToken" , accessToken , cookieOptions)
        .cookie("refreshToken" , refreshToken , cookieOptions)
        .json(new ApiResponse(201 ,{ user : SignedInUser , accessToken , refreshToken} , "User Signed In successfully !!"));

    }catch(error){
        throw new ApiError(500, error?.message || "Error occured while Signing In with google");
    }
};

export const signOut= async (req , res)=>{
    try {
        await UserModel.findByIdAndUpdate(req.user._id , { $unset:{refreshToken:1}} , {new:true});
        const cookieOptions = {httpOnly:true , secure:true};
        res
        .status(200)
        .clearCookie("accessToken",cookieOptions)
        .clearCookie("refreshToken",cookieOptions)
        .json(new ApiResponse(201 , "Signed Out successfully"))
    } catch (error) {
        throw new ApiError(500, error?.message || "Error occured while Signing Out");
    }
};

export const forgetPassword = async(req,res,next)=>{
    try {
        const user = await UserModel.findById(req.user._id);
        // email otp 
    } catch (error) {
        
    }
}