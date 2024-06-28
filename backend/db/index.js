import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

export default async ()=>
{
    try{
        const db= await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`)
        console.log("MongoDB connected:", db.connection.host)
    }
    catch(error)
    {
        console.log("MongoDB connection failed:",error)
    }
}