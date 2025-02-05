import { Types } from "mongoose";
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

    const messageListRef = contactDetail. messageListRef

    let assembledMessage: TEachMessage

    if(!contactDetail.isGroup)
    {
      // Prepare the message object
        assembledMessage = {
        senderId: userIdConverted,
        receiverId: [contactIdConverted],
        message: messagePayload,
        sentAt: new Date(),
    };
    }
    else{
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

    console.log("Message Sent:", sendMessage );
    
    return sendMessage
};


const messageServices={
    sendMessage,getAllContacts
}
export default messageServices