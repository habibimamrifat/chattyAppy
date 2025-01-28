import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../util/catchAsync';
import authUtil from '../modules/auth/auth.util';
import { TUserRole } from '../constent';



const auth = (...requeredUserRole: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const authorizationToken = req?.headers?.authorization;

        if (!authorizationToken) {
            throw new Error('Unauthorized User: Missing Authorization Token');
        }

        const decoded = authUtil.decodeAuthorizationToken(authorizationToken);

        if (!decoded) {
            throw new Error('Unauthorized User: Token decoding failed');
        }

        const { id, role, iat } = decoded as JwtPayload;

        console.log("role", role, "rquR", requeredUserRole)

        // Check if the user's role is allowed
        if (requeredUserRole.length && !requeredUserRole.includes(role)) {
            throw new Error('Unauthorized User: Role not permitted');
        }

        // Find the user in the database
        const findUser = await UserModel.findOne({
            id,
            isLoggedIn:true,
            isDeleted:false
        });

        console.log(findUser)

        if (!findUser) {
            throw new Error('Unauthorized User: Forbidden Access');
        }

        // Check if the user has logged out after the token was issued
        const logOutTime = findUser.loggedOutTime
            ? new Date(findUser.loggedOutTime).getTime() / 1000
            : null;

        if (logOutTime && iat && iat < logOutTime) {
            throw new Error(
                'Unauthorized User: Your session has expired. Please log in again'
            );
        }

        // Attach user information to the request
        req.user = decoded as JwtPayload;

        // Proceed to the next middleware
        next();
    });
};

export default auth;