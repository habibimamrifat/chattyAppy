// friend requests routes are

import mongoose from "mongoose";
import UserModel from "../user/user.model";
import { FriendrequestType } from "../../constent";
import { TFriendRequest } from "../user/user.interface";
import idConverter from "../../util/idConvirter";
import FriendListModel from "./friends.model";
import MessageListModel from "../message/message.model";

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
  
      if (!result) {
        throw new Error('User not found');
      }
  
      const filteredRequests = result.friendRequests.filter(
        (request: TFriendRequest) => request.requestState === FriendrequestType.requested
      );
    
      return { friendRequests: filteredRequests };
  
}
  
const viewAllSentREquest = async (userId:string) =>{
    const result = await UserModel.findById(userId)
    .select('friendRequests').populate({
      path: 'friendRequests.friendId',
      select: 'name img'}).sort({createdAt: -1})
  
      if (!result) {
        throw new Error('User not found');
      }
  
      const filteredRequests = result.friendRequests.filter(
        (request: TFriendRequest) => request.requestState === FriendrequestType.requesting
      );
    
      return { sent_Request_To: filteredRequests };
  
  
}
  
const deleteFriendRequest= async (userId:string , requestId:string, addSession?:mongoose.ClientSession)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
     
      const requestList = await UserModel.findById(userId)
        .select('friendRequests')
        .session(session || addSession);
  
      if (!requestList) {
        throw new Error('Friend request list not found');
      }
  
      if (!requestList.friendRequests.length) {
        throw new Error('User has no friend requests');
      }
  
     
      const findRequest = requestList.friendRequests.find(request => 
        request._id?.toString() === requestId
      );
  
      if (!findRequest) {
        throw new Error('Friend request not found');
      }
  
      // console.log('Found Friend Request:', findRequest);
  
      // Remove the friend request
      const removeFormLOggedUser = await UserModel.updateOne(
        { _id: userId },
        { $pull: { friendRequests: { _id: requestId } } },
        { session: session || addSession },
      );
  
      const deleteFromFriend =await UserModel.updateOne(
        { _id: findRequest.friendId},
        { $pull: { friendRequests: { friendId: userId } } },
        { session: session || addSession }
      );
  
      // Commit the transaction
      await session.commitTransaction();
      // console.log('Friend request deleted successfully');
  
      return {
        deletedReques: removeFormLOggedUser,
        deletedFriend: deleteFromFriend
      };
    } catch (error: any) {
      await session.abortTransaction();
      console.error('Transaction failed:', error.message);
      throw new Error(`Transaction failed: ${error.message}`);
    } finally {
      session.endSession();
    }
};
  
const acceptFriendRequest = async (userId:string, requestId:string) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
  
      
     
      const requestList = await UserModel.findById(userId)
        .select('friendRequests')
        .session(session);
  
      if (!requestList) {
        throw new Error('Friend request list not found');
      }
  
      if (!requestList.friendRequests.length) {
        throw new Error('User has no friend requests');
      }
  
     
      const findRequest = requestList.friendRequests.find(request => 
        request._id?.toString() === requestId
      );
  
      if (!findRequest) {
        throw new Error('Friend request not found');
      }
      
      // const friendid = findRequest.
      const userIdCinversation = idConverter(userId);
  
      // console.log(typeof(findRequest.friendId), typeof(userIdCinversation));
  
      const messageListBelongsto = [userIdCinversation,findRequest.friendId];
  
      const isAlreadyFriend = await FriendListModel.findOne(
        { userId, 'friendList.friendId': findRequest.friendId})
  
        if(isAlreadyFriend) {
          throw new Error('User is already a friend');
        }
  
      const messageList = await MessageListModel.create(
        [{ userId: messageListBelongsto }],
        { session } 
      );
      if(!messageList)
      {
        throw new Error('Failed to create message list');
      }
  
     const updateUserFriendList = await FriendListModel.findOneAndUpdate({userId: userIdCinversation},{$push:{friendList:{
      friendId:findRequest.friendId,
      messageListRef:messageList[0]?._id,
      lastMessageAt:Date.now() 
     }}},
    {new: true, session: session})
  
     const updateFriendsFriendList = await FriendListModel.findOneAndUpdate({userId: findRequest.friendId},{$push:{friendList:{
      friendId:userIdCinversation,
      messageListRef:messageList[0]?._id,
      lastMessageAt:Date.now() 
     }}},
    {new: true, session: session})
  
    //  deleteRequest
     const deleteRequest = await deleteFriendRequest(userId,requestId, session)
      // Commit the transaction
      await session.commitTransaction();
      // console.log('Friend request deleted successfully');
  
      
  
      return {
        messageList:messageList,
        acceptedRequest: updateUserFriendList,
        acceptedFriend: updateFriendsFriendList,
        deleteRequest:deleteRequest
      };
    } catch (error: any) {
      await session.abortTransaction();
      console.error('Transaction failed:', error.message);
      throw new Error(`Transaction failed: ${error.message}`);
    } finally {
      session.endSession();
    }
}
  
  // operation on friends
  
const viewAllFriends=async(userId:string)=>{
    const friendList = await FriendListModel.findOne({ userId })
    .populate({
      path: 'friendList.friendId',
      select: 'name img email age'
    });
  
  if (!friendList) {
    throw new Error('Friend list not found');
  }
  
  
  const activeFriends = friendList.friendList.filter(friend => friend.isDeleted !== true);
  
  return activeFriends;
}
  
const blockAFriend = async(userId:string, friendId:string)=>{
    const updateFriendBlockStatus = await FriendListModel.findOneAndUpdate(
      { userId, 'friendList.friendId': friendId, 'friendList.isBlocked': false }, // Ensure it’s not already blocked
      { $set: { 'friendList.$.isBlocked': true } },
      { new: true } // Return updated document
    );
  
    return updateFriendBlockStatus
}


const friendServices={
    sendFriendRequest,viewAllFriendRequest,deleteFriendRequest,viewAllSentREquest,acceptFriendRequest,viewAllFriends,blockAFriend
  }

  export default friendServices;