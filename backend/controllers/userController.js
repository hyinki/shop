import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';



const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'Strict',
            maxAge: 30*24*60*60*1000
        })
        //generateToken(res, user._id);
    
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      } else {
        res.status(401);
        throw new Error('Invalid email or password');
      }


   //res.send("djwnd")
});

const registerUser = asyncHandler(async (req, res) => {
    res.send("register user")
});

const logoutUser = asyncHandler(async (req, res) => {
    res.send("log out user")
});


const getUserProfile = asyncHandler(async (req, res) => {
    res.send("get user profile")
});

const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("update user profile")
});

const getUsers = asyncHandler(async (req, res) => {
    res.send("get users")
});

const getUserById = asyncHandler(async (req, res) => {
    res.send("get users by id")
});


const deleteUser = asyncHandler(async (req, res) => {
    res.send("delete users")
});

const updateUser = asyncHandler(async (req, res) => {
    res.send("update users")
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
  };