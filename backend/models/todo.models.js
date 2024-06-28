import mongoose from "mongoose";
const todoSchema=new mongoose.Schema({
    description:
    {
        type:String,
        required:true
    },
    owner:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isComplete:
    {
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Todo=mongoose.model("Todo",todoSchema)