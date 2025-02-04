import express from "express";
import auth from "../../middleWare/auth";
import { userRole } from "../../constent";
import friendsController from "./friends.controller";
const FriendsRours = express.Router();

// friend request Section
FriendsRours.post("/sendFriendRequest",auth(userRole.user), friendsController.sendFriendRequest)
FriendsRours.get("/getFriendRequest",auth(userRole.user), friendsController.viewAllFriendRequest)
FriendsRours.get("/getAllSentRequest",auth(userRole.user), friendsController.viewAllSentREquest)
FriendsRours.delete("/deleteFriendRequest",auth(userRole.user), friendsController.deleteFriendRequest)
FriendsRours.post("/acceptFriendRequest",auth(userRole.user), friendsController.acceptFriendRequest)

// operation on friends
FriendsRours.get("/viewAllFriends",auth(userRole.user), friendsController.viewAllFriends)
FriendsRours.put("/blockAFriend",auth(userRole.user), friendsController.blockAFriend)

export default FriendsRours;