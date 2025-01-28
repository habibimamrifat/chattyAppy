import { Types } from "mongoose";

type TEachMessage = {  
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId[];
    message: string;
    createdAt?: Date;
    isDeleted?: boolean;
 }
export type TMessageList={
    userId: Types.ObjectId[];
    messageList:TEachMessage[];
}