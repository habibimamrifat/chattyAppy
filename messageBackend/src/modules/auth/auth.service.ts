import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../dist/config";
import { UserModel } from "../user/user.model";


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
    id: findUserWithEmail.id,
    role: findUserWithEmail.userType,
  };
  const approvalToken = authUtill.createToken(
    tokenizeData,
    config.jwt_token_secret,
    config.token_expairsIn
  );
  const refreshToken = authUtill.createToken(
    tokenizeData,
    config.jwt_refresh_Token_secret,
    config.rifresh_expairsIn
  );

  // console.log(approvalToken, refreshToken, findUserWithEmail)

  return { approvalToken, refreshToken, findUserAndUpdate };
};

const logOut = async (authorizationToken: string) => {
  const decoded = authUtill.decodeAuthorizationToken(authorizationToken);
  const { id } = decoded as JwtPayload;

  const findUserById = await UserModel.findOneAndUpdate(
    { id: id },
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