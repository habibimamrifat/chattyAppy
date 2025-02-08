import mongoose from "mongoose";
import idConverter from "../../util/idConvirter"
import FriendListModel from "../friendList/friends.model";
import MessageListModel from "../message/message.model";
import { promise } from "zod";
import { TEachFriend, TFriendList } from "../friendList/friends.interface";

const createGroup = async (userId: string, payload: { groupName: string, groupMemberList: string[] }) => {
    const session = await mongoose.startSession(); // Start session
    session.startTransaction(); // Begin transaction

    try {
        const convertUserId = idConverter(userId);

        // Convert all group member IDs using idConverter
        const convertedGroupMemberList = payload.groupMemberList.map(id => idConverter(id));

        // Ensure the creator is also in the group
        if (!convertedGroupMemberList.includes(convertUserId)) {
            convertedGroupMemberList.push(convertUserId);
        }

        // Ensure the group has at least 3 members
        if (convertedGroupMemberList.length < 3) {
            throw new Error("A group must have at least 3 members.");
        }

        // Create a message list entry for the group
        const messageList = await MessageListModel.create([{
            userId: convertedGroupMemberList,
            isGroup: true
        }], { session });

        if (!messageList || messageList.length === 0) {
            throw new Error("Message list creation failed");
        }

        // Prepare group details to be stored in each user's friend list
        const newFriendGroup = {
            friendId: "GROUP",  // Indicates it's a group
            messageListRef: messageList[0]._id, // Get the created message list ID
            isGroup: true,
            groupDetail: {
                groupOwnerId: convertUserId,
                groupName: payload.groupName,
                groupMemberList: convertedGroupMemberList,
                deletedBy: []
            }
        };

        // Add this group as a "friend" to all group members
        await Promise.all(
             convertedGroupMemberList.map(async (eachMember) => {
                let updatedEachMember =  await FriendListModel.findOneAndUpdate(
                    { userId: eachMember },
                    { $push: { friendList: newFriendGroup } },
                    { new: true, session }
                );

                if(!updatedEachMember)
                {
                    throw Error("member failed to update")
                }
                
            })
        );



        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return newFriendGroup; // Return the created group details
    } catch (error: any) {
        await session.abortTransaction(); // Rollback on error
        session.endSession();
        throw new Error(`Group creation failed: ${error.message}`);
    }
};

const addMemberTOTheGroup = async (userId: string, friendIds: [string], contactId: string) => {
    const session = await FriendListModel.startSession(); // Start transaction session
    session.startTransaction();

    try {
        const convertedUserId = idConverter(userId);
        const convertedNewGroupMemberList = friendIds.map(id => idConverter(id));
        const convertedcontactId = idConverter(contactId);

        const updatedGroup = await FriendListModel.updateOne(
            { userId: convertedUserId, "friendList._id": convertedcontactId },
            { $push: { "friendList.$.groupDetail.groupMemberList": { $each: convertedNewGroupMemberList } } }
        );

        if (!updatedGroup) {
            throw new Error("Failed to add new members to the group");
        }

        console.log("updated group", updatedGroup)

        const newFriendGroup = await FriendListModel.aggregate([
            { $match: { userId: convertedUserId } },
            { $unwind: "$friendList" },
            { $match: { "friendList._id": convertedcontactId } }
        ]);

        if(!newFriendGroup)
        {
            throw Error("no friend group found to be added")
        }

        console.log("updated Friend group",newFriendGroup)

        

        await Promise.all(
            convertedNewGroupMemberList.map(async (eachMember) => {
               let updatedEachMember =  await FriendListModel.findOneAndUpdate(
                   { userId: eachMember },
                   { $push: { friendList: newFriendGroup } },
                   { new: true, session }
               );

               if(!updatedEachMember)
               {
                   throw Error("member failed to update")
               }
               
           })
       );



        await session.commitTransaction();
        session.endSession();

        return { success: true, message: "Members successfully added to the group" };
    } catch (error) {
        await session.abortTransaction(); // Rollback on error
        session.endSession();
        console.error("Error adding members to the group:", error);
        throw new Error("Something went wrong while adding new members to the friend list");
    }
};


const groupServices = {
    createGroup, addMemberTOTheGroup
}
export default groupServices