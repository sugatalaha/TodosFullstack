import connectDB from "./db/index.js"
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

connectDB();

app.listen(process.env.PORT,()=>
{
    console.log(`Server listening on port ${process.env.PORT}`)
})
