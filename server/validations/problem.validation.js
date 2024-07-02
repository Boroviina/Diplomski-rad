const Joi = require('joi');
const {objectID} = require('./custom.validation');

const RegionSchema = Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    latitudeDelta: Joi.number().required(),
    longitudeDelta: Joi.number().required(),
});

const CreateProblem = {
    body: Joi.object().keys({
        problemType: Joi.string().required(),
        description: Joi.string().required(),
        street: Joi.string().allow(''),
        locationDescription: Joi.string().allow(''),
        contactName: Joi.string().allow(''),
        phoneNumber: Joi.string().allow(''),
        contactEmail: Joi.string().allow(''),
        uri: Joi.array().items(Joi.string()),
        status: Joi.string(),
        searchId: Joi.string().required(),
        lat: Joi.number(),
        lng: Joi.number(),
        region: RegionSchema.optional()
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
        answer: Joi.string().allow('')
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
        status: Joi.string(),
        answer: Joi.string().allow('')
    }).min(1)
}

const deleteProblem = {
    params: Joi.object().keys({
        problemId: Joi.required().custom(objectID)
    })
}

module.exports = {CreateProblem, GetProblem, GetProblems, UpdateProblem, deleteProblem}