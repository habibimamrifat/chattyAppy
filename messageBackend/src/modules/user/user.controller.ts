import catchAsync from "../../util/catchAsync";
import userService from "./user.service";

const createUser=catchAsync(async(req,res,)=>{
const result = await userService.createUser(req.body);
res.send(result);
})

const deleteUser=catchAsync(async(req,res)=>{
    const id = req.query.id as string
    if(!id){
        throw Error("id is required")
    }   
    const result = await userService.deleteUser(id)
    res.send(result)
})

const updateUser=catchAsync(async(req,res)=>{
    const id = req.query.id as string
    if(!id){
        throw Error("id is required")
    }
    const result = await userService.updateUser(id,req.body)
    res.send(result)
})

const userController={
    createUser,deleteUser,updateUser 
}

export default userController