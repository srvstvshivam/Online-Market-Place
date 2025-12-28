import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
const protect = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Attach user to the request object, excluding the password
            req.user = await User.findById(decoded.userId).select('-password');
            console.log(req.user);

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token validation failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};
export { protect };