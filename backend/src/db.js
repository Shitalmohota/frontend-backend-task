// /project-root/backend/src/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // The MONGO_URI is defined in the .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;