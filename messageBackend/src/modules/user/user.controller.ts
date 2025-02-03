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


const sendFriendRequest = catchAsync(async (req, res) => {
    const id = req.user.id as string;
    const friendId = req.query?.friendId as string;

    if (!id || !friendId) {
        throw new Error("User ID and Friend ID are required");
    }

    // Call the service function

    const result = await userService.sendFriendRequest(id, friendId);

    // Send the response
    res.status(200).json({
        success: true,
        message: "Friend request sent successfully",
        data: result
    });
});

const viewAllFriendRequest = catchAsync(async (req, res) => {
    const id = req.user.id as string;
    const result = await userService.viewAllFriendRequest(id);
    res.status(200).json({
        success: true,
        message: "All friend requests fetched successfully",
        data: result
    })
});

const deleteFriendRequest = catchAsync(async (req, res) => {
    const id = req.user.id as string;
    const requestId = req.query?.requestId as string;

    if (!id ||!requestId) {
        throw new Error("User ID and Request ID are required");
    }

    const result = await userService.deleteFriendRequest(id, requestId)

    res.status(200).json({
        success: true,
        message: "Friend request deleted successfully",
        data: result
    })
})


const userController={
    createUser,deleteUser,updateUser,sendFriendRequest,viewAllFriendRequest,deleteFriendRequest
}

export default userController