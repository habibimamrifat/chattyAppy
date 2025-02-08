import express from "express"
import auth from "../../middleWare/auth"
import { userRole } from "../../constent"
import groupController from "./groups.controller"

const GroupRouts = express.Router()


GroupRouts.post("/createAGroup",auth(userRole.user), groupController.createGroup)
GroupRouts.patch("/addMemberToTheGroup",auth(userRole.user), groupController.addMemberTOTheGroup)

export default GroupRouts