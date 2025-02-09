import mongoose, { Types } from "mongoose";
import idConverter from "../../util/idConvirter";
import FriendListModel from "../friendList/friends.model";
import { TEachMessage } from "./message.interface";
import MessageListModel from "./message.model";



const getAllContacts = async (userId: string) => {
    const userIdConverted = idConverter(userId);

    // Fetch individual contacts (populated)
    const personalContacts = await FriendListModel.aggregate([
        { $match: { userId: userIdConverted } },
        { $unwind: "$friendList" },
        { $match: { "friendList.isGroup": false } },
        {
            $lookup: {
                from: "users",
                localField: "friendList.friendId",
                foreignField: "_id",
                as: "friendList.friendData"
            }
        },
        { $unwind: { path: "$friendList.friendData", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                contactId: "$friendList._id",
                userId: 1,
                "friendList._id": 1,
                "friendList.friendId": 1,
                "friendList.isGroup": 1,
                "friendList.friendData.name": 1,
                "friendList.friendData.email": 1,
                "friendList.friendData.img": 1
            }
        }
    ]);

    // Fetch groups (without population)
    const groups = await FriendListModel.aggregate([
        { $match: { userId: userIdConverted } },
        { $unwind: "$friendList" },
        { $match: { "friendList.isGroup": true } },
        {
            $project: {
                contactId: "$friendList._id",
                userId: 1,
                "friendList._id": 1,
                "friendList.friendId": 1,
                "friendList.isGroup": 1,
                "friendList.groupDetail": 1
            }
        }
    ]);

    // Combine both personal contacts and groups into a single array
    const allContacts = [...personalContacts, ...groups];

    return allContacts;
};

const sendMessage = async (senderId: string, contactId: string, messagePayload: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userIdConverted = idConverter(senderId);
        const contactIdConverted = idConverter(contactId);

        if (!messagePayload || !senderId || !contactId || !userIdConverted || !contactIdConverted) {
            throw new Error("Invalid Message, Sender, or Receiver.");
        }

        const accessCheck = await FriendListModel.aggregate([
            { $match: { userId: userIdConverted } },
            { $unwind: "$friendList" },
            { $match: { "friendList._id": contactIdConverted } }
        ]).session(session);

        if (!accessCheck || accessCheck.length === 0) {
            throw new Error("User's friend list not found or contact not found");
        }

        const contactDetail = accessCheck[0].friendList;
        console.log(contactDetail);

        const messageListRef = contactDetail.messageListRef;

        let assembledMessage: TEachMessage;

        if (!contactDetail.isGroup) {
            assembledMessage = {
                senderId: userIdConverted,
                receiverId: [contactIdConverted],
                message: messagePayload,
                sentAt: new Date(),
            };
        } else {
            console.log("it is a group");
            const receiverIds = contactDetail.groupDetail.groupMemberList.filter(
                (memberId: string) => memberId !== senderId).map(idConverter);;

            assembledMessage = {
                senderId: userIdConverted,
                receiverId: receiverIds,
                message: messagePayload,
                sentAt: new Date(),
            };
        }

        console.log("messageListRef", messageListRef);

        const sendMessage = await MessageListModel.findByIdAndUpdate(
            messageListRef,
            { $push: { messageList: assembledMessage } },
            { new: true, session }
        );

        if (!sendMessage) {
            throw new Error("Failed to update message list.");
        }


        const updateLastMessageTime = await FriendListModel.aggregate([
            { $match: { userId: userIdConverted } },
            { $unwind: "$friendList" },
            { $match: { "friendList._id": contactIdConverted } },
            {
                $set: {
                    "friendList.lastMessageAt": Date.now()
                }
            }
        ]).session(session);

        if(!updateLastMessageTime)
        {
            throw Error ("message time coulsd not be updated")
        }

        await session.commitTransaction();
        session.endSession();

        console.log("Message Sent:", sendMessage);

        return sendMessage;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

const viewAllMessageByContactId = async (userId: string, contactId: string) => {

    const convertedContactId = idConverter(contactId)
    const userIdConverted = idConverter(userId)

    const messageRef = await FriendListModel.aggregate([
        { $match: { userId: userIdConverted } },
        { $unwind: "$friendList" }, 
        { $match: { "friendList._id": convertedContactId } },
        { $project: { "friendList.messageListRef": 1 } }
    ]);

    const messageListId = messageRef[0].friendList.messageListRef

    const allMessage = await MessageListModel.findById({ _id: messageListId }).populate({
        path: "messageList.senderId",
        select: "img name"
    })
    if (!allMessage) {
        throw Error("no conversation yet")
    }


    return allMessage.messageList

}


const messageServices = {
    sendMessage, getAllContacts, viewAllMessageByContactId
}
export default messageServices