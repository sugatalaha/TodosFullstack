import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
    username:
    {
        type:String,
        required:true,
        unique:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true
    },
    todos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Todo'
    }],
    fullname:
    {
        type:String,
        required:true
    },
    accessToken:
    {
        type:String,
    }
},{timestamps:true})

userSchema.methods.generateAccessToken = function () {
    const accessToken = jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_SPAN
        }
    )
    return accessToken
}

userSchema.pre("save",async function ()
{
    
    if(this.isModified("password"))this.password=await bcrypt.hash(this.password,10);
})

export const User=mongoose.model("User",userSchema)