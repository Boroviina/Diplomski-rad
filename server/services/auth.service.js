const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require("../models/token.model");
const ApiError = require('../utils/ApiError');
const {tokenTypes} = require('../config/tokens');


const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatching(password))) {
        throw  new ApiError(httpStatus.UNAUTHORIZED, 'IncorrectEmailOrPassword');
    }
    if (user.role !== 'user') {
        throw new ApiError(httpStatus.FORBIDDEN, "Not approved");
    }
    return user;
}

const loginAdminWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatching(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    if (!user.active || user.role !== 'admin') {
        throw new ApiError(httpStatus.FORBIDDEN, "Not approved");
    }
    return user;
}

const logout = async (refreshToken) => {
    const refreshTokenDocs = await Token.findOne({token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false});
    if (!refreshTokenDocs) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    // await  refreshTokenDocs.remove();
    await Token.deleteOne({_id: refreshTokenDocs._id})
}

const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
        const user = await userService.getUserById(refreshTokenDoc.user);
        if (!user) {
            throw new Error();
        }
        await Token.findByIdAndDelete(refreshTokenDoc._id);
        return tokenService.generateAuthTokens(user);
    } catch (e) {
        throw  new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
}

const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const ressetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
        const user = await userService.getUserById(ressetPasswordTokenDoc.user);
        if (!user) {
            throw new Error();
        }
        await userService.updateUserById(user.id, {password: newPassword});
        await Token.deleteMany({user: user.id, type: tokenTypes.RESET_PASSWORD});
    } catch (e) {
        throw new ApiError(httpStatus.UNAUTHORIZED, e);
    }
}

const verifyEmail = async (verifyEmailToken) => {
    try {
        const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
        const user = await userService.getUserById(verifyEmailTokenDoc.user);
        if (!user) {
            throw  new Error();
        }
        await Token.deleteMany({user: user.id, type: tokenTypes.VERIFY_EMAIL});
        await userService.updateUserById(user.id, {isEmailVerified: true});

    } catch (e) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
    }
}

module.exports = {
    loginUserWithEmailAndPassword,
    loginAdminWithEmailAndPassword,
    logout,
    verifyEmail,
    resetPassword,
    refreshAuth
}