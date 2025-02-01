import { Types } from "mongoose";

export type TUser = {
name: string;
email: string;
img: string;
age: number;
role: string;
password: string;
friendRequests: string[];
friendListRef?:Types.ObjectId;
isLoggedIn?: boolean;
isDeleted?: boolean;
loggedOutTime?: Date;
}