import mongoose, { Types } from "mongoose";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import FriendListModel from "../friendList/friends.model";

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

const userService = {
    createUser, deleteUser,updateUser 
   }

export default userService;