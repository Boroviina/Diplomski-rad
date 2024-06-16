const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problems.controller');
const validate = require('../config/validate');
const problemValidation = require('../validations/problem.validation')
const auth=require('../config/middleware/auth');

router.route('/')
    .post(validate(problemValidation.CreateProblem), problemController.createProblem)
    .get(validate(problemValidation.GetProblems), problemController.getProblems)

router.route('/:problemId')
    .get(validate(problemValidation.GetProblem), problemController.getProblem)
    .put(auth('updateProblem'), validate(problemValidation.UpdateProblem), problemController.updateProblem)
    .delete(auth('deleteProblem'), validate(problemValidation.deleteProblem), problemController.deleteProblem)

module.exports = router;