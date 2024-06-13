const User = require('../models');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const httpStatus = require("http-status");

const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
})

const getUsers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUsers(filter, options);
    res.send(result);
})

const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not found");
    }
    res.send(user);
})

const updateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUserById(req.params.userId, req.body);
    res.send(user);
});

const deleteUser=catchAsync(async (req,res)=>{
    await userService.deleteUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
})

module.exports={
    deleteUser,
    updateUser,
    getUser,
    getUsers,
    createUser
}

// const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.send(users);
//     } catch (err) {
//         console.error('Error getting users:', err);
//         res.status(500).json({message: err.message});
//     }
// }
// const createUser = async (req, res) => {
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     });
//     try {
//         const newUser = await user.save();
//         res.status(201).json(newUser.toJSON());
//     } catch (err) {
//         res.status(400).json({message: err.message});
//     }
// }
//
// module.exports = {createUser, getAllUsers}
