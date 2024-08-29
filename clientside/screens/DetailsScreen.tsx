import {Text, View, StyleSheet, Image, ScrollView, Pressable, Modal, TouchableOpacity} from "react-native";
import {FC, useEffect, useState} from "react";
import {ProblemModel} from "../shared/models/problems.model";
import {getProblem} from "../shared/services/problems.service";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../types/types";
import DetailComponent from "../components/ReviewProblemComponents/DetailComponent";

function getEnumValueByKey(enumObj: any, key: string): string {
    return enumObj[key as keyof typeof enumObj] || key;
}

type DetailsScreenProps = NativeStackScreenProps<RootStackParamsList, 'DetailsScreen'>;
const DetailsScreen: FC<DetailsScreenProps> = ({route}) => {
    const {detailId} = route.params;

    return <DetailComponent detailId={detailId}/>
}

export default DetailsScreen;
