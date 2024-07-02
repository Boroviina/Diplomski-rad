import {StyleSheet, Text, View, RefreshControl, ScrollView} from "react-native";
import FilterComponent from "./FilterComponent";
import ProblemLog from "./problemLog";
import {Colors} from "../../constants/Colors";
import {ProblemType} from "../../shared/enums/problemType.enum";
import {ProblemModel} from "../../shared/models/problems.model";
import {FC, useCallback, useEffect, useState} from "react";
import {getProblems} from "../../shared/services/problems.service";
import SplashScreen from "../../constants/SplashScreen";
import {useAuth} from "../../shared/contexts/auth-context";

const RewiewComponent = () => {
    const [problems, setProblems] = useState<ProblemModel[] | undefined>();
    const [code, setCode] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ProblemType | undefined>(undefined);

    const {auth} = useAuth();

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
        let filteredProblems = problems;
        if (auth) {
            if (code){
                filteredProblems = filteredProblems?.filter((problem) => problem.searchId === code);
            }
            if (selectedItem){
                filteredProblems = filteredProblems?.filter(problem => problem.problemType === selectedItem)
            }

        } else {
            filteredProblems = filteredProblems?.filter((problem) => problem.searchId === code);
        }
        setProblems(filteredProblems);

    }

    return <View style={styles.mainContainer}>
        <View style={styles.filterContainer}>
            <FilterComponent value={code}
                             onChangeText={setCode}
                             onPress={searchHandler}
                             selectedItem={selectedItem}
                             onSelectItem={setSelectedItem}
            />
        </View>
        <ScrollView style={styles.scrollContainer}
                    contentContainerStyle={styles.listContainer}
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
        padding: 10
    },
    filterContainer: {
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    listContainer: {
        flexGrow: 1,
    },
    scrollContainer: {
        paddingBottom: 20,
        borderRadius: 16
    }
})