const Joi = require('joi');
const {password, objectID} = require('./custom.validation');

const CreateUser = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        role: Joi.string().valid('user'),
    })
};

const GetUsers = {
    query: Joi.object().keys({
        name: Joi.string(),
        lastname: Joi.string(),
        email: Joi.string(),
        role: Joi.string(),
        password: Joi.string(),
        active: Joi.string(),
    })
}

const GetUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectID)
    })
}
const updateUser={
    params: Joi.object().keys({
        userId: Joi.required().custom(objectID)
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        lastname: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().custom(password),
        role: Joi.string().allow(''),
        active: Joi.string(),
    }).min(1)
}

const deleteUser={
    params: Joi.object().keys({
        userId:Joi.required().custom(objectID)
    })
}

module.exports = {CreateUser, GetUser, GetUsers, updateUser, deleteUser}