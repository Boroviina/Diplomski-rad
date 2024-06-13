const ApiError= require('../utils/ApiError');
const pick=require('../utils/pick');
const catchAsync=require('../utils/catchAsync');
const httpStatus=require('http-status');
const probemService=require('../services/problem.service');

const createProblem=catchAsync(async (req, res)=>{
    const problem=await probemService.createProblem(req.body);
    res.status(httpStatus.CREATED).send(problem);
})

const getProblems=catchAsync(async (req, res)=>{
    const filter=pick(req.query, ['problemType']);
    const options=pick(req.query, ['sortBy', 'limit', 'page']);
    const result=await probemService.queryProblems(filter, options);
    res.send(result);
})

const getProblem=catchAsync(async (req, res)=>{
    const problem=await probemService.getProblemById(req.params.problemId);
    if (!problem){
        throw new ApiError(httpStatus.NOT_FOUND, "Problem not found");
    }
    res.send(problem);
})

const updateProblem=catchAsync(async (req, res)=>{
    const problem=await probemService.updateProblemById(req.params.problemId, req.body);
    res.send(problem);
})

const deleteProblem=catchAsync(async (req, res)=>{
    await probemService.deleteProblemById(req.params.problemId);
    res.status(httpStatus.NO_CONTENT).send();
})

module.exports={
    deleteProblem,
    updateProblem,
    getProblem,
    getProblems,
    createProblem
}