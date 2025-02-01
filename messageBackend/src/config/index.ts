import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path:path.join(process.cwd(), '.env')
});

const config = {
port:process.env.PORT,
mongo_Uri:process.env.MONGODB_URI as string,
salt_rounds:process.env.SALT_ROUNDS as string,
nodeEnv:process.env.NODE_ENV

}

export default config;