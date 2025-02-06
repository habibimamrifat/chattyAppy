import mongoose from "mongoose";
import idConverter from "../../util/idConvirter"
import FriendListModel from "../friendList/friends.model";
import MessageListModel from "../message/message.model";

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
                let addToFriendList = await FriendListModel.findOneAndUpdate(
                    {userId:eachMember},
                    { $push: { friendList: newFriendGroup } },
                    { new: true, session }
                );
                console.log(addToFriendList)
            })
        );

        

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return newFriendGroup; // Return the created group details
    } catch (error:any) {
        await session.abortTransaction(); // Rollback on error
        session.endSession();
        throw new Error(`Group creation failed: ${error.message}`);
    }
};


const groupServices={
createGroup
}
export default groupServices