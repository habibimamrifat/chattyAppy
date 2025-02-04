import catchAsync from "../../util/catchAsync";
import friendServices from "./friends.service";

// friend requests
const sendFriendRequest = catchAsync(async (req, res) => {
    const id = req.user.id as string;
    const friendId = req.query?.friendId as string;

    if (!id || !friendId) {
        throw new Error("User ID and Friend ID are required");
    }

    // Call the service function

    const result = await friendServices.sendFriendRequest(id, friendId);

    // Send the response
    res.status(200).json({
        success: true,
        message: "Friend request sent successfully",
        data: result
    });
});

const viewAllFriendRequest = catchAsync(async (req, res) => {
    const id = req.user.id as string;
    const result = await friendServices.viewAllFriendRequest(id);
    res.status(200).json({
        success: true,
        message: "All Sent requests fetched successfully",
        data: result
    })
});

const viewAllSentREquest = catchAsync(async (req, res) => {
    const id = req.user.id as string;
    const result = await friendServices.viewAllSentREquest(id);
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

    const result = await friendServices.deleteFriendRequest(id, requestId)

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
    const result = await friendServices.acceptFriendRequest(id, requestId)

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
    const result = await friendServices.viewAllFriends(id);
    res.status(200).json({
        success: true,
        message: "All friends fetched successfully",
        data: result
    })
});

const blockAFriend = catchAsync(async (req, res) =>{
    const id = req.user.id as string;
    const friendId = req.query?.friendId as string;

    const result = await friendServices.blockAFriend(id, friendId)

    res.status(200).json({
        success: true,
        message: "Friend blocked successfully",
        data: result
    })
});

const friendsController ={
    sendFriendRequest, viewAllFriendRequest, viewAllSentREquest, deleteFriendRequest, acceptFriendRequest, viewAllFriends, blockAFriend
}
export default friendsController