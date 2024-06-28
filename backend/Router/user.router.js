import Router from "express"
import { getUserDetails, loginUser,logoutUser,registerUser, updatePassword } from "../controllers/user.controllers.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const userRouter=Router();

userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/logout').post(verifyJWT,logoutUser)
userRouter.route('/get-user-details').get(verifyJWT,getUserDetails)
userRouter.route('/update-password').post(verifyJWT,updatePassword)

export default userRouter
