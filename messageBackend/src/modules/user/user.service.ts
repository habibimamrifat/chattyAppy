import mongoose, { Types } from "mongoose";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import FriendListModel from "../friendList/friends.model";
import { FriendrequestType } from "../../constent";


const createUser = async (payload: TUser) => {
    const session = await mongoose.startSession();
    session.startTransaction(); // Start transaction
  
    try {
      // Create user inside the transaction
      const newUser = new UserModel(payload);
      const userResult = await newUser.save({ session });
  
      // Create a message list entry for the new user
      const newFrindList = new FriendListModel({
        userId: userResult._id,
      });
  
      const friendListRef = await newFrindList.save({ session });
  
      // Commit transaction
      await session.commitTransaction();
      session.endSession();
  
      return { user: userResult, messageList: friendListRef };
    } catch (error:any) {
      await session.abortTransaction(); // Rollback on error
      session.endSession();
      throw new Error(`Transaction failed: ${error.message}`);
    }
  };

const deleteUser= async(id:string)=>{
  const result = await UserModel.findByIdAndUpdate({_id:id},{isDeleted:true},{new:true})
  return result
}

const updateUser = async (id: string, payload: Partial<TUser>) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return updatedUser;
}

const sendFriendRequest = async (userId: string, friendId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update sender's friend request list
    const updateSendersFriendRequestList = await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          friendRequests: { friendId, requestState: FriendrequestType.requesting }
        }
      },
      { new: true, session }
    );

    if (!updateSendersFriendRequestList) {
      throw new Error('Failed to update sender’s friend request list');
    }

    // Update receiver's friend request list
    const updateReceiversFriendRequestList = await UserModel.findByIdAndUpdate(
      friendId,
      {
        $push: {
          friendRequests: { friendId: userId, requestState: FriendrequestType.requested }
        }
      },
      { new: true, session }
    );

    if (!updateReceiversFriendRequestList) {
      throw new Error('Failed to update receiver’s friend request list');
    }

    // If both updates succeed, commit the transaction
    await session.commitTransaction();
    session.endSession();

    return {
      sender: updateSendersFriendRequestList,
      receiver: updateReceiversFriendRequestList
    };
  } catch (error: any) {
    // Rollback transaction if any operation fails
    await session.abortTransaction();
    session.endSession();
    throw new Error(`Transaction failed: ${error.message}`);
  }
};

const viewAllFriendRequest = async (userId:string) =>{
  const result = await UserModel.findById(userId)
  .select('friendRequests').populate({
    path: 'friendRequests.friendId',
    select: 'name img'}).sort({createdAt: -1})

  return result
}

const deleteFriendRequest= async (userId:string , requestId:string)=>{
  const requestList = await UserModel.findById({_id: userId}).select('friendRequests')
  if(!requestList)
  {
    throw new Error('friend request list is not found')
  }
  
  if(! requestList.friendRequests.length){
    throw new Error('User not found or has no friend requests')
  }

  const findRequest = requestList.friendRequests.filter(request => 
    request._id.toString() === requestId
  );

  if(!findRequest.length){
    throw new Error('Friend request not found')
  }
  console.log(findRequest);

  // const session = await mongoose.startSession()
  // session.startTransaction()
  // try{

  // }
  // catch(error:any){
  //   await session.abortTransaction()
  //   session.endSession()
  //   throw new Error(`Transaction failed: ${error.message}`)
  // }
}

const userService = {
    createUser, deleteUser,updateUser,sendFriendRequest,viewAllFriendRequest,deleteFriendRequest
   }

export default userService;