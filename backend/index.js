import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';

const app = express();
dotenv.config();

const DB = process.env.MONGO_URL;

app.use(express.json());

mongoose.connect(DB).then(() => {      //mongoose.connect() returns a promise
        console.log("Connection successful");
}).catch(() => {
    console.log("Error in connection");
});       

app.use('/api/users', userRouter);

app.listen(5000,function(){
    console.log('server is ready at http://localhost:5000');
})