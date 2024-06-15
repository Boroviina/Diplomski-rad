import {StyleSheet, Text, View} from "react-native";
import FilterComponent from "./FilterComponent";
import ProblemLog from "./problemLog";
import {Colors} from "../../constants/Colors";
import {ProblemType} from "../../shared/enums/problemType.enum";
import {ProblemModel} from "../../shared/models/problems.model";
import {FC, useEffect, useState} from "react";
import {getProblems} from "../../shared/services/problems.service";

const RewiewComponent = () => {
    const [problems, setProblems] = useState<ProblemModel[] | undefined>();
    const [code, setCode] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProblems();
            // console.log("Ovo su podaci ", data);
            data?.sort((a,b)=>(new Date(b.createdAt!)).getTime()-(new Date(a.createdAt!)).getTime())
            setProblems(data);

        }
        fetchData();

    }, [code])
    function getProblemTypeName(type: ProblemType | undefined) {
        return type ? ProblemType[type as unknown as keyof typeof ProblemType] : undefined;
    }
    async function searchHandler() {
        const result = problems?.filter((problem) => {
            return problem.searchId === code
        })
        setProblems(result);
    }

    return <View style={styles.mainContainer}>
        <View style={styles.filterContainer}>
            <FilterComponent value={code} onChangeText={setCode} onPress={searchHandler}/>
        </View>
        <View style={styles.listContainer}>
            {problems ? (
                problems.map((problem) => (
                    <ProblemLog key={problem.id} id={problem.id} title={getProblemTypeName(problem.problemType)}
                                image={(problem.uri && problem.uri[0]) || undefined}
                                status={problem.status || undefined}/>
                ))
            ) : (
                <Text>Ucitavanje...</Text>
            )}
        </View>
    </View>
}
    export default RewiewComponent;

    const styles = StyleSheet.create({
        mainContainer:{
            flex:1,
            flexDirection: "column",
            backgroundColor: Colors.primary50,
        },
        filterContainer: {
            flex: 1
        },
        listContainer: {
            flex: 7,
        }
    })