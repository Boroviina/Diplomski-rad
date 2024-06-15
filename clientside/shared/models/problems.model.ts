import {BaseModel} from "./base.model";
import {ProblemStatus} from '../enums/problemStatus.enum'
import {ProblemType} from '../enums/problemType.enum'

export class ProblemModel extends BaseModel {
    id?: string;
    problemType?: ProblemType;
    description?: string;
    city?: string;
    street?: string;
    number?: string;
    locationDescription?: string;
    uri?: string [];
    contactName?: string;
    phoneNumber?: string;
    status?: ProblemStatus;
    searchId?: string;
    contactEmail?: string;
    answer?: string;
    createdAt?: Date;

    constructor(attributes?: any) {
        super();
        this.setAttributes(attributes);
    }
}

export class ProblemsResponse extends BaseModel {
    results?: ProblemModel[];
    page?: number;
    limit?: number;
    totalPages?: number;
    totalResults?: number;

    constructor(attributes?: any) {
        super();
        this.setAttributes(attributes);
        this.results = attributes?.results.map((problem: any) => new ProblemModel(problem))
    }
}