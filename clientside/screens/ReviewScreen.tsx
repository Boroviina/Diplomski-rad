import {View, BackHandler, Text, StyleSheet} from "react-native";

import {FC, useEffect, useState} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../types/types";
import ProblemLog from "../components/ReviewProblemComponents/problemLog";
import {ProblemProvider} from "../shared/contexts/problem-context";
import {getProblems} from "../shared/services/problems.service";
import {ProblemModel} from "../shared/models/problems.model";
import {ProblemType} from "../shared/enums/problemType.enum";


type ReviewScreenProps = NativeStackScreenProps<RootStackParamsList, 'ReviewProblems'>

const ReviewScreen: FC<ReviewScreenProps> = ({navigation}) => {
    const [problems, setProblems] = useState<ProblemModel[] | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProblems();
            console.log("Ovo su podaci ", data);
            setProblems(data);

        }
        fetchData();

    }, [])

    function getProblemTypeName(type: ProblemType | undefined) {
        return type ? ProblemType[type as unknown as keyof typeof ProblemType] : undefined;
    }

    return <ProblemProvider>
        <View>
            <Text>Ovdje ce biti filter za pretragu</Text>
        </View>
        <View>
            {problems ? (
                problems.map((problem) => (
                    <ProblemLog key={problem.id} title={getProblemTypeName(problem.problemType)}
                                image={(problem.uri && problem.uri[0]) || undefined}
                                status={problem.status || undefined}/>
                ))
            ) : (
                <Text>Ucitavanje...</Text>
            )}
        </View>

    </ProblemProvider>
}

export default ReviewScreen;

const styles=StyleSheet.create({
    filterContainer:{

    }
})