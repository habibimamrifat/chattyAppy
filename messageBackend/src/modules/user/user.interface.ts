import { Types } from "mongoose";

export type TFriendRequest ={
    [x: string]: string;
    friendId:Types.ObjectId,
    requestState:"requesting"|"requested"|"deleted"|"accepted"
}

export type TUser = {
name: string;
email: string;
img: string;
age: number;
role: string;
password: string;
friendRequests: TFriendRequest[];
friendListRef?:Types.ObjectId;
isLoggedIn?: boolean;
isDeleted?: boolean;
loggedOutTime?: Date;
}