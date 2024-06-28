import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json({ limit: "16kb", }))
// app.use(express.urlencoded({
//     extended: true,
//     limit: "16kb"
// }))
app.use(cors(
    {
        origin:'*'
    }
))

import userRouter from "./Router/user.router.js"
import todosRouter from "./Router/todo.router.js"

app.use('/api/v1/users',userRouter)
app.use('/api/v1/todos', todosRouter)


export default app;