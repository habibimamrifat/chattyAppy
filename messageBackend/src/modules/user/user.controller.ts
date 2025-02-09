import catchAsync from "../../util/catchAsync";
import userService from "./user.service";

// genarel user Routs
const createUser=catchAsync(async(req,res,)=>{
const result = await userService.createUser(req.body);
res.status(200).json({
    message:"User Created Successfully along with Friend List",
    user_Id: result.user?._id,
    friendList_Id:result.friendList._id

});
})

const deleteUser=catchAsync(async(req,res)=>{
    const id = req.user.id as string
    if(!id){
        throw Error("id is required")
    }   
    const result = await userService.deleteUser(id)
    res.status(200).json(result)
})

const updateUser=catchAsync(async(req,res)=>{
    const id = req.user.id as string
    if(!id){
        throw Error("id is required")
    }
    const result = await userService.updateUser(id,req.body)
    res.send(result)
})

const myProfile = catchAsync(async(req,res)=>{
    const id = req.user.id as string
    const result = await userService.myProfile(id)
    res.status(200).json({
        "status":200,
        "message":"My Profile",
        "data":result
    })
});

const viewProfile = catchAsync(async(req,res)=>{
    const id = req.query.id as string
    if(!id){
        throw Error("id is required")
    }
    const result = await userService.viewProfile(id)
    res.send(result)
})

const viewAllUsers = catchAsync(async(req,res)=>{
    const result = await userService.viewAllUsers()
    res.send(result)
});


const userController={
    createUser,deleteUser,updateUser,viewProfile,myProfile,viewAllUsers
}

export default userController