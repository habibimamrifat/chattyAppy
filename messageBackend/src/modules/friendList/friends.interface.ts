import { Types } from "mongoose";

export type TEachFriend = {
    friendId: Types.ObjectId;
    messageListRef: Types.ObjectId;
    lastMessageAt:Date;
    isGroup?: boolean;
    groupName?:string;
    isDeleted?: boolean;
    isBlocked?: boolean;
}

export  type TFriendList = {
    userId: Types.ObjectId;
    friendList:TEachFriend[];
}
