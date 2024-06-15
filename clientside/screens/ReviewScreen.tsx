import {View, BackHandler, Text, StyleSheet} from "react-native";

import {FC, useEffect, useState} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../types/types";
import ProblemLog from "../components/ReviewProblemComponents/problemLog";
import {ProblemProvider} from "../shared/contexts/problem-context";
import {getProblems} from "../shared/services/problems.service";
import {ProblemModel} from "../shared/models/problems.model";
import {ProblemType} from "../shared/enums/problemType.enum";
import FilterComponent from "../components/ReviewProblemComponents/FilterComponent";
import {Colors} from "../constants/Colors";
import RewiewComponent from "../components/ReviewProblemComponents/RewiewComponent";


type ReviewScreenProps = NativeStackScreenProps<RootStackParamsList, 'ReviewProblems'>

const ReviewScreen: FC<ReviewScreenProps> = ({navigation}) => {
    return <RewiewComponent/>
}

export default ReviewScreen;

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