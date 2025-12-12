// /project-root/backend/src/utils/generateToken.js

import jwt from 'jsonwebtoken';

// Function to generate a JWT
const generateToken = (id) => {
    // The secret key is loaded from the .env file
    return jwt.sign(
        { id },
        process.env.JWT_SECRET, 
        {
            expiresIn: '30d', // Token expires in 30 days
        }
    );
};

export default generateToken;