import idConverter from "../../util/idConvirter";
import FriendListModel from "../friendList/friends.model";
import { TEachMessage } from "./message.interface";
import MessageListModel from "./message.model";


const getAllContacts = async(userId:string)=> {
    const userIdConverted = idConverter(userId); 
  
    const result = await FriendListModel.aggregate([
        { $match: { userId: userIdConverted } },
        { $unwind: "$friendList" },
        { 
          $match: { 
              "friendList.isDeleted": { $ne: true }, 
              "friendList.isBlocked": { $ne: true }  
          } 
        }
    ]);
    return result
  };



  const sendMessage = async (senderId: string, receiverId: string, messagePayload: string) => {
    const userIdConverted = idConverter(senderId);
    const reciverIdConverted = idConverter(receiverId);

    if (!messagePayload || !senderId || !receiverId || !userIdConverted || !reciverIdConverted) {
        throw new Error("Invalid Message, Sender, or Receiver.");
    }

    // Ensure user has access to send messages
    const accessCheck = await FriendListModel.findOne({
        userId: senderId,
        "friendList.friendId": reciverIdConverted,
        "friendList.isBlocked": false,
    });

    if (!accessCheck) {
        throw new Error("Access denied");
    }

    console.log("Access Check:", accessCheck);

    // Find the messageList reference
    const messageListId = accessCheck.friendList.find(
        (eachFriend) => eachFriend.friendId.toString() === reciverIdConverted.toString()
    );

    if (!messageListId || !messageListId.messageListRef) {
        throw new Error("No message list found, probably deleted.");
    }

    console.log("Message List Ref:", messageListId.messageListRef);

    // Prepare the message object
    const assembledMessage: TEachMessage = {
        senderId: userIdConverted,
        receiverId: [reciverIdConverted],
        message: messagePayload,
        sentAt: new Date(),
    };

    // Update the MessageListModel with the new message
    const sendMessage = await MessageListModel.findByIdAndUpdate(
        messageListId.messageListRef, // Correct `_id` reference
        { $push: { messageList: assembledMessage } }, // Correct `$push` syntax
        { new: true } // Return the updated document
    );

    if (!sendMessage) {
        throw new Error("Failed to update message list.");
    }

    console.log("Message Sent:", assembledMessage);
    
    return sendMessage
};


const messageServices={
    sendMessage,getAllContacts
}
export default messageServices