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
        res.status(200).json({
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
    const user = await User.findById(req.user._id);
    if(user){
        res.status(200).json({
            _id: user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else{
        res.status(404);
        throw new Error('user not found');
    }
});




// @desc: update user profile
// @route: PUT /api/users/profile
// @access: private
const updateUserProfile = asyncHandler( async (req, res)=>{
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        } // this will go to userModel to the encrypt and save part. 

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name:updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else{
        res.status(404);
        throw new Error('user not found');
    }
});







// @desc: get users
// @route: GET /api/users
// @access: private/admin
const getUsers = asyncHandler( async (req, res)=>{
    const users = await User.find({});
    res.status(200).json(users);
});

// @desc: get user by ID
// @route: GET /api/users/:id
// @access: private/admin
const getUserByID = asyncHandler( async (req, res)=>{
    const user = await User.findById(req.params.id).select('-password');
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404);
        throw new Error('User not found');
    }

});

// @desc: delete user
// @route: DELETE /api/users/:id
// @access: private/admin
const deleteUser = asyncHandler( async (req, res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error('Cannot Delete Admin user')
        }
        await User.deleteOne({_id:user._id})
        res.status(201).json({message: 'User deleted Successfully'})
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc: update user
// @route: PUT /api/users/:id
// @access: private/admin
const updateUser = asyncHandler( async (req, res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        user.name=req.body.name || user.name;
        user.email = req.body.name || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();
        res.status(200).json({
            _id:updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else{
        res.status(404);
        throw new Error('User not found');
    }
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