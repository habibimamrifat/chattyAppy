type TUser ={
    name: string;
    email: string;
    img: string;
    password: string;
    role: string;
    isLoggedIn: boolean;
    isDeleted: boolean;
    loggedOutTime: Date;
    createdAt: Date;
    updatedAt: Date;
}