const mongoose = require('mongoose');
const {DB_NAME} = require('../constants.js');
// import mongoose  from "mongoose";
// import { DB_NAME } from "../constants.js";

const connectDB = async() =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Mongodb connection error", error);
        process.exit(1);
    }
}
// console.log(DB_NAME);

module.exports = connectDB;