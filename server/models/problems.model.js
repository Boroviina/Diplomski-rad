const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');
const {problemType} = require('./enums/ProblemType');
const {problemStatus} = require("./enums/ProblemStatus");


const ProblemsSchema = mongoose.Schema({
    problemType: {
        type: String,
        enum: problemType,
        required: [true, "The field must be filled"]
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true
    },
    locationDescription: {
        type: String
    },
    uri: {
        type: [String],
    },
    contactName: {
        type: String,
    },
    phoneNumber: {
        type: String
    },
    contactEmail: {
        type: String
    },
    status: {
        type: String,
        enum: problemStatus,
        default: 'primljeno'
    },
    searchId: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'problems'
})

ProblemsSchema.plugin(toJSON);
ProblemsSchema.plugin(paginate);

const Problem = mongoose.model('Problem', ProblemsSchema);
module.exports = Problem;