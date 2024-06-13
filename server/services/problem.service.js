const httpStatus = require('http-status');
const {Problem} = require('../models');
const ApiError=require('../utils/ApiError');

const createProblem=async (problemBody)=>{
    if (!problemBody){
        throw new ApiError(httpStatus.BAD_REQUEST, "There is no problem");
    }
    return Problem.create(problemBody);
}
const queryProblems=async (filter, option)=>{
    const problems= await Problem.paginate(filter, option);
    return problems
}
const getProblemById=async (id)=>{
    return Problem.findById(id);
}

const updateProblemById=async (problemId, updateBody)=>{
    const problem=await getProblemById(problemId);
    if(!problem){
        throw  new ApiError(httpStatus.BAD_REQUEST, "Problem not found");
    }
    Object.assign(problem, updateBody);
    await problem.save();
    return problem;
}

const deleteProblemById=async(problemId)=>{
    const problem=await getProblemById(problemId);
    if (!problem){
        await new ApiError(httpStatus.BAD_REQUEST, 'Problem not found');
    }
    await problem.deleteOne();
    return problem;
}

module.exports={
    createProblem,
    getProblemById,
    deleteProblemById, updateProblemById,
    queryProblems

}