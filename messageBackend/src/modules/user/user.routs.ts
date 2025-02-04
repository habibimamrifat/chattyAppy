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




export default UserRoutes