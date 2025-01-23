import UserModel from "../models/User.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const updateUser = async (req , res)=>{
    
}
export const deleteUser = async (req , res)=>{
    
}
export const getUsers = async (req , res)=>{
    try{
        const user = await UserModel.findById(req.user._id);
        if(!user) throw new ApiError(400,"User not found");
        res
        .status(201)
        .json(new ApiResponse(201,{username:user.username , email:user.email},"user found successfully"));
    } catch(error){
        throw new ApiError(500,"Could not getUserDetails");
    }
}
