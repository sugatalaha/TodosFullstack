import {User} from "../models/user.models.js"
import bcrypt from "bcrypt"
import mongoose from "mongoose"

const registerUser=async (req,res)=>{
    const {username,fullname,email,password}=req.body
    if([username,fullname,email,password].some((field)=>field?.trim()==="")){
        return res.status(400).json({message:"All fields must be filled"});
    }
    const existedUser=await User.findOne({
        $and:[{username},{email}]
    })
    if(existedUser){
        return res.status(400).json({message:"User is already registered"});
    }
    const user=await User.create(
        {
            username:username.toLowerCase(),
            password:password,
            fullname:fullname,
            email:email.toLowerCase()
        }
    )
    if(!user){
        return res.status(500).json({message:"User registration failed"});
    }
    const cookies=user.generateAccessToken();
    return res.status(200).json({message:"User registered successfully",user:user,accessToken:cookies})
}

const loginUser=async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are not filled"});
    }
    const user=await User.findOne({
        $and:[{username:username},{email:email}]
    })
    if(!user){
        return res.status(404).json({message:"User not registered"});
    }
    const isMatched=await bcrypt.compare(password,user.password);
    if(!isMatched){
        return res.status(400).json({message:"Enter valid password"});
    }
    const accessToken = user.generateAccessToken();
    return res.status(200).json({message:"User logged in",accessToken:accessToken})
}

const logoutUser=(req,res)=>{
    const user=req?.user;
    if(!user){
        return res.status(404).json({message:"User not verified"});
    }
    user.accessToken=undefined;
    return res.status(200).json({message:"User logged out"});
}

const updatePassword=async (req,res)=>{
    if(!req.user){
        return res.status(404).json({message:"Unauthorized user"})
    }
    const {password}=req.body;
    if(password?.trim()===""){
        return res.status(400).json({message:"Password not entered"})
    }
    const prevUser=await User.findByIdAndDelete(req?.user?._id)
    if(!prevUser){
        return res.status(400).json({message:"User not found"})
    }
    const savedUser=await User.create({
        username:prevUser.username,
        email:prevUser.email,
        fullname:prevUser.fullname,
        password:password
    })

    return res.status(200).json({message:"User password changed",user:savedUser})
}

const getUserDetails=async (req,res)=>{
    const user=req?.user;
    if(!user){
        return res.status(404).json({message:"Unauthorized access"});
    }
    const username=req?.user?.username;
    const email=req?.user?.email
    try{
        const userAggregate = await User.aggregate([
            {
                $match:
                {
                    $and:[{username:username},{email:email}]
                },
            },
            {
                $lookup:
                {
                    from: "todos",
                    localField: "_id",
                    foreignField: "owner",
                    as: "todos"
                }
            },
            {
                $project:
                {
                    username: 1,
                    fullname: 1,
                    email: 1,
                    todos: 1
                }
            }
        ])
        return res.status(200).json({ message: "User details fetched successfully", user: userAggregate[0] })
    }
    catch(error){
        console.log("Error:",error)
        return res.status(500).json({message:"Internal Server error"})
    }
}

export {registerUser,
    loginUser,
    logoutUser,
    updatePassword,
    getUserDetails
}