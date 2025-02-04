import catchAsync from "../../util/catchAsync";
import userService from "./user.service";

// genarel user Routs
const createUser=catchAsync(async(req,res,)=>{
const result = await userService.createUser(req.body);
res.send(result);
})

const deleteUser=catchAsync(async(req,res)=>{
    const id = req.user.id as string
    if(!id){
        throw Error("id is required")
    }   
    const result = await userService.deleteUser(id)
    res.send(result)
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



// friend requests
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
        message: "All Sent requests fetched successfully",
        data: result
    })
});

const viewAllSentREquest = catchAsync(async (req, res) => {
    const id = req.user.id as string;
    const result = await userService.viewAllSentREquest(id);
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

const acceptFriendRequest = catchAsync(async (req, res) =>{
    const id = req.user.id as string;
    const requestId = req.query?.requestId as string;

    if (!id ||!requestId) {
        throw new Error("User ID and Request ID are required");
    }
    const result = await userService.acceptFriendRequest(id, requestId)

    res.status(200).json({
        success: true,
        message: "Friend request accepted successfully",
        data:{
            messageList:result.messageList ||"false",
            acceptedRequest: result.acceptedRequest ||"false",
            acceptedFriend: result.acceptedFriend ||"false",
            deleteRequest:result.deleteRequest ||"false"
        }
    })
});

// operation on friends

const viewAllFriends = catchAsync(async (req, res) =>{
    const id = req.user.id as string;
    const result = await userService.viewAllFriends(id);
    res.status(200).json({
        success: true,
        message: "All friends fetched successfully",
        data: result
    })
});

const blockAFriend = catchAsync(async (req, res) =>{
    const id = req.user.id as string;
    const friendId = req.query?.friendId as string;

    const result = await userService.blockAFriend(id, friendId)

    res.status(200).json({
        success: true,
        message: "Friend blocked successfully",
        data: result
    })
});


const userController={
    createUser,deleteUser,updateUser,sendFriendRequest,viewAllFriendRequest,deleteFriendRequest,viewAllSentREquest,viewProfile,myProfile,viewAllUsers,acceptFriendRequest,viewAllFriends,blockAFriend
}

export default userController