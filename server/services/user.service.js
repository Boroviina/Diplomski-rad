const httpStatus = require('http-status');
const {User} = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");

const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
    }
    return User.create(userBody);
};

const queryUsers = async (filter, options) => {
    const users = await User.paginate(filter, options);
    return users;
}

const getUserById = async (id) => {
    return User.findById(id);
}

const getUserByEmail = async (email) => {
    return User.findOne({email});
};
const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
}

const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    await user.deleteOne();
    return user;
}
const validatePassword = async (id, newPassword) => {

        const user=await getUserById(id);
        console.log("User object:", user);
        console.log("User object:", user.password);
        console.log("Lozinka:", newPassword.newPassword);


        const isValid=await bcrypt.compare(newPassword.newPassword, user.password);
        return isValid;
}

module.exports = {
    createUser,
    queryUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
    validatePassword
}

