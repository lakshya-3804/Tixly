
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {type: String,required: true,unique: true},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    refreshToken:{type:String}
},{timestamps: true});

userSchema.methods.isPasswordCorrect=async function(password){
    return bcrypt.compareSync(password , this.password);
}   

userSchema.methods.generateAccessToken = function(){
    const payload = {
        _id: this._id,
        email: this.email,
        username: this.username,
    }
    return jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET ,{expiresIn: '1h'})
}

userSchema.methods.generateRefreshToken = function(){
    const payload = {
        _id: this._id        
    }
    return jwt.sign(payload , process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
}

const UserModel = mongoose.model('UserModel', userSchema);
export default UserModel;