import { Types } from "mongoose";

export type TEachFriend = {
    friendId: Types.ObjectId;
    messageListRef: Types.ObjectId;
    lastMessageAt:Date;
    isDeleted?: boolean;
    isBlocked?: boolean;
}

export  type TFriendList = {
    userId: Types.ObjectId;
    friendList:TEachFriend[];
}
