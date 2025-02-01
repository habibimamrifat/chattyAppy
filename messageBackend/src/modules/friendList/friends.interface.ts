import { Types } from "mongoose";

type eachFriend = {
    lastMessageAt:Date;
    friendId: Types.ObjectId;
    messageListRef: Types.ObjectId;
}

export  type TFriendList = {
    userId: Types.ObjectId;
    friendList:eachFriend[];
}
