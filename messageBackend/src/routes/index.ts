import express from "express";
import UserRoutes from "../modules/user/user.routs";
import authRouter from "../modules/auth/auth.routes";
import FriendsRours from "../modules/friendList/friends.routes";
import MessageRoutes from "../modules/message/message.routes";


const Routes = express.Router();
console.log("working");
// Array of module routes
const moduleRouts = [
  {
    path:"/auth",
    router:authRouter
  },
  {
    path: "/users",
    router: UserRoutes
  }, 
  {
    path: "/friends",
    router: FriendsRours
  }, 
  {
    path: "/messages",
    router: MessageRoutes
  } 
];

// Register each route in moduleRouts
moduleRouts.forEach(({ path, router }) => {
  // console.log("path:",path,router)
  Routes.use(path, router);
});

// Export the router
export default Routes;