import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"

export const verifyJWT=async (req,res,next)=>
{
    const accessToken=req?.cookies?.accessToken || req?.header("Authorization")?.replace('Bearer ','')
    if(!accessToken){
        return res.status(404).json({message:"Unauthorized user"})
    }
    try{
    const decoded_token=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
    const userId=decoded_token?._id;
    const user=await User.findById(userId)
    if(!user){
        return res.status(400).json({message:"User not identified"});
    }
    req.user=user;
    next();
    }
    catch(error){
        console.log("Error",error)
        return res.status(400).json({message:"User not verified"})
    }
}