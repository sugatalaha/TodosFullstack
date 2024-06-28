import {Todo} from "../models/todo.models.js"
import mongoose from "mongoose";

const createTodo=async (req,res)=>{
    const user=req?.user;
    if(!user){
        return res.status(404).json({message:"User not verified"});
    }
    const {description}=req?.body;
    if(!description){
        return res.status(400).json({message:"Description is empty"});
    }
    const todo=await Todo.create(
        {
            description:description,
            owner:user?._id
        }
    )
    if(!todo){
        return res.status(500).json({message:"Failed to create todo"});
    }
    return res.status(200).json({message:"ToDo created ",todo:todo})
}

const deleteTodo=async (req,res)=>{
    const user=req?.user;
    if(!user){
        return res.status(404).json({message:"User not verified"});
    }
    const {todoId}=req.body;
    if(!todoId){
        return res.status(400).json({message:"Todo Id not provided"});
    }
    const deletedTodo=await Todo.findByIdAndDelete(todoId)
    if(!deletedTodo){
        return res.status(400).json({message:"Todo not found"})
    }
    else{
        return res.status(200).json({message:"Todo deleted",todo:deletedTodo})
    }
}

const getTodos=(req,res)=>{
    const user=req?.user;
    if(!user){
        return res.status(404).json({message:"User not verified"});
    }
    try{
        const todoAggregate = Todo.aggregate([
            {
                $match:
                {
                    owner: user._id
                }
            }
        ])
        return res.status(200).json({ message: "Todos retrieved successfully", todos: todoAggregate })
    }
    catch(error){
        console.log("Todo error:", error)
        return res.status(500).json({message:"Internal Server error"})
    }
}

const updateTodo=async (req,res)=>{
    const {todoId}=req.body
    if(!req?.user){
        return res.status(404).json({message:"User not verified"})
    }
    const existedTodo=await Todo.findById(todoId)
    if(!existedTodo){
        return res.status(400).json({message:"Todo not found"});
    }
     const status=existedTodo.isComplete;
     const updatedTodo=await Todo.findByIdAndUpdate(existedTodo._id,
        {
            isComplete:!status
        },
        {
            new:true
        }
     )
     return res.status(200).json({message:"User todo updated successfully",todo:updatedTodo})
}

export {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo
}