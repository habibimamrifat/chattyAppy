import express from "express"
import userController from "./user.controller"
import auth from "../../middleWare/auth"
import { userRole } from "../../constent"

const UserRoutes = express.Router()

UserRoutes.post("/createUser", userController.createUser)
UserRoutes.delete("/deleteUser", userController.deleteUser)
UserRoutes.post("/updateUser", userController.updateUser)
UserRoutes.post("/sendFriendRequest",auth(userRole.user), userController.sendFriendRequest)
UserRoutes.get("/getFriendRequest",auth(userRole.user), userController.viewAllFriendRequest)
UserRoutes.delete("/deleteFriendRequest",auth(userRole.user), userController.deleteFriendRequest)


export default UserRoutes