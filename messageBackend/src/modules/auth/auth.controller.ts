import catchAsync from "../../util/catchAsync";
import authSercvices from "./auth.service";

const logIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authSercvices.logIn(email, password);
  const { approvalToken, refreshToken, findUserAndUpdate } = result;
  res.status(200).json({
    message: "Log In Successful",
    userId: findUserAndUpdate?._id,
    approvalToken: approvalToken,
    refreshToken: refreshToken,
  });
});

const logOut = catchAsync(async (req, res) => {
  const authorizationToken = req?.headers?.authorization;
  console.log(authorizationToken);

  if (!authorizationToken) {
    throw Error("token is missing");
  }

  const result = await authSercvices.logOut(authorizationToken);
  res.status(200).json({
    message: "Log OUT Successful",
  });
});

const authController = {
  logIn,
  logOut,
};
export default authController;
