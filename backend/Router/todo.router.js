import Router from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTodo, deleteTodo, updateTodo } from "../controllers/todo.controllers.js";

const todosRouter=Router();

todosRouter.use(verifyJWT)
todosRouter.route('/add-todo').post(createTodo)
todosRouter.route('/delete-todo').post(deleteTodo)
todosRouter.route('/change-status').post(updateTodo)

export default todosRouter;