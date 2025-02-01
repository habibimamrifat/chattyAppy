import express from "express";
import UserRoutes from "../modules/user/user.routs";


const Routes = express.Router();
console.log("working");
// Array of module routes
const moduleRouts = [
  {
    path: "/users",
    router: UserRoutes
  } 
];

// Register each route in moduleRouts
moduleRouts.forEach(({ path, router }) => {
  // console.log("path:",path,router)
  Routes.use(path, router);
});

// Export the router
export default Routes;