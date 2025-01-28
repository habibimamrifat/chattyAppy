import dotenv from 'dotenv';
import { mongo } from 'mongoose';
import path from 'path';

dotenv.config({
    path:path.join(process.cwd(), '.env')
});

const config = {
port:process.env.PORT,
mongo_Uri:process.env.MONGODB_URI as string

}

export default config;