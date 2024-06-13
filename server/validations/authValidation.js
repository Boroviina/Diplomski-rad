const Joi = require('joi');
const {password} = require('./custom.validation');


const register={
    body:Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
        lastname: Joi.string().required(),
        active: Joi.boolean()
    })
}

const login={
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}

const logout={
    body: Joi.object().keys({
        refreshToken:Joi.string().required()
    })
}

const refreshToken={
    body:Joi.object().keys({
        refreshToken:Joi.string().required()
    })
}

module.exports={
    refreshToken,
    login,
    logout,
    register
}