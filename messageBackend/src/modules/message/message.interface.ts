import { Types } from "mongoose";

export type TEachMessage = {  
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId[];
    message: string;
    sentAt?: Date;
    isDeleted?: boolean;
 }
export type TMessageList={
    userId: Types.ObjectId[];
    messageList:TEachMessage[];
}