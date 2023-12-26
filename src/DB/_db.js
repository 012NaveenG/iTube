import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectdb =async () => {
    try {
        const dbInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(dbInstance.connection.host,dbInstance.connection.port)
    } catch (error) {
        console.log("Error:",error)
        throw error
    }
}