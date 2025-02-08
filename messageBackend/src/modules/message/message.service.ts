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
    const userIdConverted = idConverter(senderId);
    const contactIdConverted = idConverter(contactId);



    // console.log(messagePayload,contactId,userIdConverted,contactIdConverted)

    if (!messagePayload || !senderId || !contactId || !userIdConverted || !contactIdConverted) {
        throw new Error("Invalid Message, Sender, or Receiver.");
    }

    // Ensure user has access to send messages
    const accessCheck = await FriendListModel.aggregate([
        { $match: { userId: userIdConverted } },  
        { $unwind: "$friendList" },               
        { $match: { "friendList._id": contactIdConverted } } 
    ]);

    if (!accessCheck || accessCheck.length === 0) {
        throw new Error("User's friend list not found or contact not found");
    }

    const contactDetail = accessCheck[0].friendList;
    console.log(contactDetail);

    const messageListRef = contactDetail.messageListRef

    let assembledMessage: TEachMessage


    if (!contactDetail.isGroup) {
        // Prepare the message object
        assembledMessage = {
            senderId: userIdConverted,
            receiverId: [contactIdConverted],
            message: messagePayload,
            sentAt: new Date(),
        };
    }
    else {
        console.log("it is a group")
        const reciverIds = contactDetail.groupDetail.groupMemberList.filter(
            (memberId : string) => memberId  !== senderId);


        assembledMessage = {
            senderId: userIdConverted,
            receiverId: [contactIdConverted],
            message: messagePayload,
            sentAt: new Date(),
        }
    }

console.log("messageListRef",messageListRef)

    // Update the MessageListModel with the new message
    const sendMessage = await MessageListModel.findByIdAndUpdate(
        messageListRef, // Correct `_id` reference
        { $push: { messageList: assembledMessage } }, // Correct `$push` syntax
        { new: true } // Return the updated document
    );

    if (!sendMessage) {
        throw new Error("Failed to update message list.");
    }

    console.log("Message Sent:", sendMessage);

    return sendMessage
};

const viewAllMessageByContactId = async (userId: string, contactId: string) => {

    const convertedContactId = idConverter(contactId)
    const userIdConverted = idConverter(userId)
    const messageRef = await FriendListModel.aggregate([
        { $match: { userId: userIdConverted } }, // Find the user by userId
        { $unwind: "$friendList" }, // Unwind friendList array
        { $match: { "friendList._id": convertedContactId } }, // Match the specific friend
        { $project: { "friendList.messageListRef": 1 } } // Return only the friend object
    ]);

    const messageListId = messageRef[0].friendList.messageListRef

    const allMessage = await MessageListModel.findById({ _id: messageListId }).populate({
        path: "messageList.senderId",
        select:"img name"
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