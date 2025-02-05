import express from "express";
import messageController from "./message.controller";
import auth from "../../middleWare/auth";
import { userRole } from "../../constent";
const MessageRoutes = express.Router();


MessageRoutes.get("/allContacts",auth(userRole.user),messageController.getAllContacts)
MessageRoutes.post("/sendMessage",auth(userRole.user),messageController.sendMessage)



export default MessageRoutes;