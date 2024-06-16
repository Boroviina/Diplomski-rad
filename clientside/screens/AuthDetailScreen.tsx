import {View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../types/types";
import {FC} from "react";
import DetailComponent from "../components/ReviewProblemComponents/DetailComponent";

type props = NativeStackScreenProps<RootStackParamsList, 'AuthDetailScreen'>

const AuthDetailScreen: FC<props> = ({route}) => {
    const {detailId}=route.params;
    return <DetailComponent detailId={detailId}/>


}

export default AuthDetailScreen