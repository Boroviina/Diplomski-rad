const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');
const {problemType} = require('./enums/ProblemType');
const {problemStatus} = require("./enums/ProblemStatus");

const RegionSchema = mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitudeDelta: {
        type: Number,
        required: true
    },
    longitudeDelta: {
        type: Number,
        required: true
    }
});

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
    lng:{
        type: Number
    },
    lat:{type:Number},
    street: {
        type: String,
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
        default: 'obradaUToku'
    },
    searchId: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        default: ''
    },
    region: {
        type: RegionSchema,
        required: false // Postavi na true ako je region obavezan
    }
}, {
    timestamps: true,
    collection: 'problems'
})

ProblemsSchema.plugin(toJSON);
ProblemsSchema.plugin(paginate);

const Problem = mongoose.model('Problem', ProblemsSchema);
module.exports = Problem;