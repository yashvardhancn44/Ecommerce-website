import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";


// @desc: Auth user and get token
// @route: POST /api/users/login
// @access: public
const authUser = asyncHandler( async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email: email})
    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id);
        res.json({
            _id:user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc: Register user 
// @route: POST /api/users
// @access: public
const registerUser = asyncHandler( async (req, res)=>{
    const {name, email, password}=req.body;
    const userExists = await User.findOne({email:email});
    if(userExists){
        res.status(400);
        throw new Error('user already exists');
    }
    const user = await User.create({
        name,
        email,
        password
    });

    if (user){
        generateToken(res,user._id);
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else{
        res.status(400);
        throw new Error('Invalid user data');
    }   
});





// @desc: Logout user & clear the cookie
// @route: POST /api/users/logout
// @access: private
const logoutUser = asyncHandler( async (req, res)=>{
    //clearing the cookie
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({message: 'logged out succesfully'});
});

// @desc: Get user profile
// @route: GET /api/users/profile
// @access: private
const getUserProfile = asyncHandler( async (req, res)=>{
    res.send('get user profile');
});

// @desc: update user profile
// @route: PUT /api/users/profile
// @access: private
const updateUserProfile = asyncHandler( async (req, res)=>{
    res.send('user profile updated');
});

// @desc: get users
// @route: GET /api/users
// @access: private/admin
const getUsers = asyncHandler( async (req, res)=>{
    res.send('get users');
});

// @desc: get user by ID
// @route: GET /api/users/:id
// @access: private/admin
const getUserByID = asyncHandler( async (req, res)=>{
    res.send('get user by ID');
});

// @desc: delete user
// @route: DELETE /api/users/:id
// @access: private/admin
const deleteUser = asyncHandler( async (req, res)=>{
    res.send('delete user');
});

// @desc: update user
// @route: PUT /api/users/:id
// @access: private/admin
const updateUser = asyncHandler( async (req, res)=>{
    res.send('update user');
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser,
}