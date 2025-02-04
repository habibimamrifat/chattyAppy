import express from "express"
import userController from "./user.controller"
import auth from "../../middleWare/auth"
import { userRole } from "../../constent"

const UserRoutes = express.Router()

// user genarel Routs
UserRoutes.post("/createUser", userController.createUser)
UserRoutes.get("/myProfile",auth(userRole.user), userController.myProfile)
UserRoutes.delete("/deleteUser",auth(userRole.user), userController.deleteUser)
UserRoutes.post("/updateUser",auth(userRole.user), userController.updateUser)
UserRoutes.get("/viewProfile", userController.viewProfile)

UserRoutes.get("/peopleYouMayKnow",userController.viewAllUsers)

// friend request Section
UserRoutes.post("/sendFriendRequest",auth(userRole.user), userController.sendFriendRequest)
UserRoutes.get("/getFriendRequest",auth(userRole.user), userController.viewAllFriendRequest)
UserRoutes.get("/getAllSentRequest",auth(userRole.user), userController.viewAllSentREquest)
UserRoutes.delete("/deleteFriendRequest",auth(userRole.user), userController.deleteFriendRequest)
UserRoutes.post("/acceptFriendRequest",auth(userRole.user), userController.acceptFriendRequest)

// operation on friends
UserRoutes.get("/viewAllFriends",auth(userRole.user), userController.viewAllFriends)
UserRoutes.put("/blockAFriend",auth(userRole.user), userController.blockAFriend)


export default UserRoutes