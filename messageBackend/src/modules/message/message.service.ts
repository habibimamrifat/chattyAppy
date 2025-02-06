import mongoose, { Types } from "mongoose";
import idConverter from "../../util/idConvirter";
import FriendListModel from "../friendList/friends.model";
import { TEachMessage } from "./message.interface";
import MessageListModel from "./message.model";



const getAllContacts = async (userId: string) => {
    const userIdConverted = idConverter(userId);

    const result = await FriendListModel.findOne({ userId: userIdConverted })
        .populate({
            path: "friendList.friendId",
            model: "User", // Reference model name
            match: { isDeleted: { $ne: true }, isBlocked: { $ne: true } }, // Apply conditions
            select: "name email img" // Select required fields
        })
        .lean();

    return result
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
        { $match: { userId: userIdConverted } },  // Match the userId
        { $unwind: "$friendList" },               // Unwind the friendList array
        { $match: { "friendList._id": contactIdConverted } }  // Match the specific _id
    ]);

    if (!accessCheck || accessCheck.length === 0) {
        throw new Error("User's friend list not found or contact not found");
    }

    const contactDetail = accessCheck[0].friendList;  // The friend object you wanted
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
        console.log("it is group")
        assembledMessage = {
            senderId: userIdConverted,
            receiverId: [contactIdConverted],
            message: messagePayload,
            sentAt: new Date(),
        }
    }



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