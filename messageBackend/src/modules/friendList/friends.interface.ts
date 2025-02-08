import { Types } from "mongoose";

export type TGroup={
    groupImg:string;
    groupOwnerId?:Types.ObjectId;
    groupName:string;
    groupMemberList:[Types.ObjectId];
    deletedBy?:[Types.ObjectId];
    isDeleted?:boolean
}

export type TEachFriend = {
    friendId: Types.ObjectId | "GROUP";
    messageListRef: Types.ObjectId;
    lastMessageAt:Date;
    isGroup?: boolean;
    groupDetail?:TGroup
    isDeleted?: boolean;
    isBlocked?: boolean;
}

export  type TFriendList = {
    userId: Types.ObjectId;
    friendList:TEachFriend[];
}
