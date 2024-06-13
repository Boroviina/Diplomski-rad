const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {userService, authService, tokenService} = require('../services');


const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({user, tokens});
})

const login = catchAsync(async (req, res) => {
    const {email, password} = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({user, tokens});
})

const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
})

const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({...tokens});
});

const forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
})

const guestMode=catchAsync(async (req, res)=>{
    const guestToken=await tokenService.generateGuestToken();
    res.send(guestToken);
})

module.exports = {
    forgotPassword,
    refreshTokens, logout, login, register,
    guestMode,
}