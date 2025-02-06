import { NextFunction, Request, Response } from "express";

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404).json({
    status: "fail",
    message: error.message,
  });
};

export default routeNotFound;



// https://documenter.getpostman.com/view/41349713/2sAYX5M3Gk



// NODE_ENV="development"

// PORT=4000
// MONGODB_URI=mongodb+srv://habibrifatx21:sbXCrxZn4bWKRmMQ@chattyappy.wuli6.mongodb.net/chattyAppy?retryWrites=true&w=majority&appName=chattyAppy
// SALT_ROUNDS=6



// JWT_TOKEN_SECRET=79875e071895c86a2e5bbc085e16288a778b725f75263764868d87b28a77885f
// TOKEN_EXPIRES_IN=4d

// REFRESH_TOKEN=9e0d333c070d38bdb29be93c8c23415a69def0577237df9e329138d374b53f38
// REFRESH_TOKEN_EXPIRES_IN=365d