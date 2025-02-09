import mongoose from "mongoose";
import { TFriendRequest, TUser } from "./user.interface";
import UserModel from "./user.model";
import FriendListModel from "../friendList/friends.model";
import { FriendrequestType } from "../../constent";
import idConverter from "../../util/idConvirter";
import MessageListModel from "../message/message.model";

// gebarel user Routs are
const createUser = async (payload: TUser) => {
    const session = await mongoose.startSession();
    session.startTransaction(); // Start transaction
  
    try {
      // Create user inside the transaction
      const newUser = new UserModel(payload);
      const userResult = await newUser.save({ session });
  
      // Create a message list entry for the new user
      const newFrindList = new FriendListModel({userId: userResult._id});
      const friendListResult = await newFrindList.save({ session });

      const updateUser = await UserModel.findByIdAndUpdate({_id:userResult._id},{friendListRef:friendListResult._id},{new:true, session});
  
      // Commit transaction
      await session.commitTransaction();
      session.endSession();
  
      return { user: updateUser, friendList: friendListResult};
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

const myProfile = async (id:string) => {
  const result = await UserModel.findById(id)
   .populate("friendRequests.friendId", "name img").populate("friendListRef")
   .select(
      "name email img age role friendRequests.friendId friendRequests.requestState"
    );

    return result;
}

const viewProfile = async (id:string) => {
  const result = await UserModel.findById(id).select( "name img age")
  return result
}

const viewAllUsers= async()=>{
  const result = await UserModel.find({isDeleted: false}).select("name email img age")
  return result
}




// message Section



const userService = {
    createUser, deleteUser,updateUser,viewProfile,myProfile,viewAllUsers
   }

export default userService;