import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect routes
const protect = asyncHandler(async (req, res, next)=>{
    let token;

    //read jwt from the cookie. (using the name 'jwt' as we named it that way in the controller region)
    token = req.cookies.jwt;
    if (token) {
        try {
            // here the jwt.verify is from import JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password'); // now this user will be in req object which we can access everywhere.
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else{
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});


// Admin Middleware
const admin = (req, res, next)=>{
    if (req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401);
        throw new Error('Not authorized as admin');
    }
};

export { protect, admin};