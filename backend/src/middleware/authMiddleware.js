// /project-root/backend/src/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;

    // Check for "Bearer <token>" in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (split "Bearer" from the token string)
            token = req.headers.authorization.split(' ')[1];

            // Verify token using the secret key from environment variables
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the user object (without the password) to the request
            // This allows controllers to know who the logged-in user is (req.user)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Proceed to the next middleware or controller function
        } catch (error) {
            console.error('Token verification failed:', error.message);
            // Token is invalid or expired
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

export { protect };