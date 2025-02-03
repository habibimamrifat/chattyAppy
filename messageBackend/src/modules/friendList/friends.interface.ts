import { Types } from "mongoose";

type eachFriend = {
    friendId: Types.ObjectId;
    messageListRef: Types.ObjectId;
    lastMessageAt:Date;
}

export  type TFriendList = {
    userId: Types.ObjectId;
    friendList:eachFriend[];
}
