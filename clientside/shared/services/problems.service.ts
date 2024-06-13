import Api from "./api-clients/api-client";
import {ProblemModel} from "../models/problems.model";

const PROBLEMS_ENDPOINT = 'problems';

export const getProblems = (): Promise<ProblemModel[] | null> => {
    return Api.get(PROBLEMS_ENDPOINT)
        .then(response =>response.data)
        .then(data=>data.results.map((problem: any)=>new ProblemModel(problem)))
}

export const getProblem=(problemId:string):Promise<ProblemModel|null>=>{
    return Api.get(`${PROBLEMS_ENDPOINT}/${problemId}`)
        .then(response=>response.data)
        .then(data=>new ProblemModel(data));
}

export const updateProblem=(problemId:string, problem: Partial<ProblemModel>):Promise<ProblemModel|null>=>{
    return Api.patch(`${PROBLEMS_ENDPOINT}/${problemId}`, problem)
        .then(response=>response.data)
        .then(data=>new ProblemModel(data));
}

export const createProblem=(problem: ProblemModel): Promise<ProblemModel|null>=>{
    return Api.post(`${PROBLEMS_ENDPOINT}`, problem)
        .then(response=>response.data)
        .then(data=>new ProblemModel(data));
}

export const deleteProblem=(problemId: string):Promise<any>=>{
    return Api.remove(`${PROBLEMS_ENDPOINT}/${problemId}`)
        .then(response=>response.data);
}