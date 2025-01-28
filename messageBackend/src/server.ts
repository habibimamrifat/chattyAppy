import mongoose from 'mongoose';
import app from './app'
import config from './config'
import { Server } from 'http'

const port = config.port;

let server: Server



async function main() {
    try {
        const dbConnection = await mongoose.connect(config.mongo_Uri);
        if(dbConnection.connection.readyState !== 1){
            throw new Error('Error connecting to database');
        }   
        server = app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }

}

main();