import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import authUtil from "./auth.util";
import UserModel from "../user/user.model";
import config from "../../config";


const logIn = async (email: string, password: string) => {
  const findUserWithEmail = await UserModel.findOne({
    email: email,
    isDeleted: false,
  }).select("+password");

  if (!findUserWithEmail) {
    throw Error("no user found with this email");
  }

  const match = await bcrypt.compare(password, findUserWithEmail.password);
  if (!match) {
    throw Error("password is not matched");
  }

  const findUserAndUpdate = await UserModel.findOneAndUpdate(
    { email: email },
    { isLoggedIn: true },
    { new: true }
  );

  if (!findUserWithEmail) {
    throw Error("no; user found with this email");
  }

  // Tokenize user data
  const tokenizeData = {
    id: findUserWithEmail._id.toHexString(),
    role: findUserWithEmail.role,
  };
  const approvalToken = authUtil.createToken(
    tokenizeData,
  
  );
  const refreshToken = authUtil.createToken(
    tokenizeData,
 
  );

  // console.log(approvalToken, refreshToken, findUserWithEmail)

  return { approvalToken, refreshToken, findUserAndUpdate };
};

const logOut = async (authorizationToken: string) => {
  const decoded = authUtil.decodeAuthorizationToken(authorizationToken);
  const { id } = decoded as JwtPayload;

  const findUserById = await UserModel.findByIdAndUpdate(
    { _id: id },
    { isLoggedIn: false, loggedOutTime: new Date() },
    { new: true }
  );
  return findUserById;
};

const authSercvices = {
  logIn,
  logOut,
};
export default authSercvices;