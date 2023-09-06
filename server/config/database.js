 import mongoose from "mongoose";
 import * as dotenv from 'dotenv';
 export const connectDB = () => {
    dotenv.config();
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => console.log('connected to mongo'))
    .catch((err)=> {
        console.error('failed to connect with mongo');
        console.error(err);
    })
 }
 