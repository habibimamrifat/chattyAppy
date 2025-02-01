import express from "express"
import userController from "./user.controller"

const UserRoutes = express.Router()

UserRoutes.post("/createUser", userController.createUser)
UserRoutes.delete("/deleteUser", userController.deleteUser)
UserRoutes.post("/updateUser", userController.updateUser)


export default UserRoutes