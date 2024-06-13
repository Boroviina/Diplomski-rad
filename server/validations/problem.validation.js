const Joi = require('joi');
const {objectID} = require('./custom.validation');

const CreateProblem = {
    body: Joi.object().keys({
        problemType: Joi.string().required(),
        description: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        locationDescription: Joi.string(),
        contactName: Joi.string(),
        phoneNumber: Joi.string(),
        uri: Joi.array().items(Joi.string()),
        status: Joi.string(),
        searchId: Joi.string().required(),
        contactEmail: Joi.string()
    })
}

const GetProblems = {
    query: Joi.object().keys({
        problemType: Joi.string(),
        description: Joi.string(),
        city: Joi.string(),
        street: Joi.string(),
        locationDescription: Joi.string(),
        contactName: Joi.string(),
        phoneNumber: Joi.string(),
        uri: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const GetProblem = {
    params: Joi.object().keys({
        problemId: Joi.string().custom(objectID)
    })
}

const UpdateProblem = {
    params: Joi.object().keys({
        problemId: Joi.required().custom(objectID)
    }),
    body: Joi.object().keys({
        problemType: Joi.string(),
        description: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        locationDescription: Joi.string(),
        contactName: Joi.string(),
        phoneNumber: Joi.string(),
        uri: Joi.string(),
        status: Joi.string()
    }).min(1)
}

const deleteProblem = {
    params: Joi.object().keys({
        problemId: Joi.required().custom(objectID)
    })
}

module.exports = {CreateProblem, GetProblem, GetProblems, UpdateProblem, deleteProblem}