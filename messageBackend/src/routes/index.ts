import express from "express";


const Routes = express.Router();
console.log("working");
// Array of module routes
const moduleRouts = [
  {
    path: "/auth",
    router: authRouter,
  } 
];

// Register each route in moduleRouts
moduleRouts.forEach(({ path, router }) => {
  // console.log("path:",path,router)
  Routes.use(path, router);
});

// Export the router
export default Routes;