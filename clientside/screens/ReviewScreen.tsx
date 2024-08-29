import {StyleSheet} from "react-native";

import {FC, useEffect, useState} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../types/types";
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