import {Text, View, StyleSheet, Image, ScrollView, Pressable, Modal, TouchableOpacity} from "react-native";
import {FC, useEffect, useState} from "react";
import {ProblemModel} from "../shared/models/problems.model";
import {getProblem} from "../shared/services/problems.service";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../types/types";
import {Colors} from "../constants/Colors";
import {ProblemType} from "../shared/enums/problemType.enum";
import {Video} from 'expo-av';
import PressableImage from "../components/ReviewProblemComponents/PressableImage";
import PictureModal from "../components/ReviewProblemComponents/PictureModal";
import SentDetails from "../components/ReviewProblemComponents/SentDetails";
import Answer from "../components/ReviewProblemComponents/Answer";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Status from "../components/ReviewProblemComponents/Status";
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
