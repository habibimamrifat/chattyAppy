import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path:path.join(process.cwd(), '.env')
});

const config = {
port:process.env.PORT,
mongo_Uri:process.env.MONGODB_URI as string,
salt_rounds:process.env.SALT_ROUNDS as string,
nodeEnv:process.env.NODE_ENV,
jwt_token:process.env.JWT_TOKEN_SECRET as string,
jwt_expires_In:process.env.TOKEN_EXPIRES_IN as string,
refresh_token:process.env.REFRESH_TOKEN as string,
refresh_token_expires_in:process.env.REFRESH_TOKEN_EXPIRES_IN as string


}

export default config;