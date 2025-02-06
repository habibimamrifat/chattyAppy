import express from "express"
import auth from "../../middleWare/auth"
import { userRole } from "../../constent"
import groupController from "./groups.controller"

const GroupRouts = express.Router()


GroupRouts.post("/createAGroup",auth(userRole.user), groupController.createGroup)

export default GroupRouts