import {StyleSheet, Text, View, RefreshControl, ScrollView} from "react-native";
import FilterComponent from "./FilterComponent";
import ProblemLog from "./problemLog";
import {Colors} from "../../constants/Colors";
import {ProblemType} from "../../shared/enums/problemType.enum";
import {ProblemModel} from "../../shared/models/problems.model";
import {FC, useCallback, useEffect, useState} from "react";
import {getProblems} from "../../shared/services/problems.service";
import SplashScreen from "../../constants/SplashScreen";

const RewiewComponent = () => {
    const [problems, setProblems] = useState<ProblemModel[] | undefined>();
    const [code, setCode] = useState('');
    const [refreshing, setRefreshing] = useState(false);


    const fetchData = async () => {
        const data = await getProblems();
        // console.log("Ovo su podaci ", data);
        data?.sort((a, b) => (new Date(b.createdAt!)).getTime() - (new Date(a.createdAt!)).getTime())
        setProblems(data);
    }
    useEffect(() => {
        fetchData();

    }, [code])

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, []);

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
        <ScrollView contentContainerStyle={styles.listContainer}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        >
            {problems ? (
                problems.map((problem) => (
                    <ProblemLog key={problem.id} id={problem.id} title={getProblemTypeName(problem.problemType)}
                                image={(problem.uri && problem.uri[0]) || undefined}
                                status={problem.status || undefined}/>
                ))
            ) : (
                <SplashScreen/>
            )}
        </ScrollView>
    </View>
}
export default RewiewComponent;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.primary50,
    },
    filterContainer: {
        height: 100,
        justifyContent: "center"
    },
    listContainer: {
        flex: 8,
        alignItems: "center"
    }
})