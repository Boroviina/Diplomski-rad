import {ProblemModel} from "../models/problems.model";
import {createContext, FC, ReactNode, useContext, useState} from "react";

interface ProblemContextProps {
    problem: Partial<ProblemModel>;
    setProblem: (problem: Partial<ProblemModel>) => void;
}

const ProblemContext = createContext<ProblemContextProps | undefined>(undefined);

export const ProblemProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [problem, setProblemState] = useState<ProblemModel>(new ProblemModel());

    const setProblem = (updatedProblem: Partial<ProblemModel>) => {
        setProblemState(prevProblem => {
            const newProblem = {...prevProblem, ...updatedProblem};
            delete newProblem.setAttributes;
            return new ProblemModel(newProblem);
        });
    }

    return (<ProblemContext.Provider value={{problem, setProblem}}>
            {children}
        </ProblemContext.Provider>
    );

}

export const useProblem = () => {
    const context = useContext(ProblemContext);
    if (!context) {
        throw new Error("useProblem must be used within a ProblemProvider");
    }
    return context;
};