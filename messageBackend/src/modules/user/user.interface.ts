import { Types } from "mongoose";

export type TUser = {
name: string;
email: string;
img: string;
password: string;
friendListRef:Types.ObjectId;
role: string;
isLoggedIn: boolean;
isDeleted: boolean;
loggedOutTime: Date;
}