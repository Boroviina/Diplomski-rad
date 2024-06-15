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

function getEnumValueByKey(enumObj: any, key: string): string {
    return enumObj[key as keyof typeof enumObj] || key;
}

type DetailsScreenProps = NativeStackScreenProps<RootStackParamsList, 'DetailsScreen'>;
const DetailsScreen: FC<DetailsScreenProps> = ({route}) => {
    const [details, setDetails] = useState<ProblemModel | undefined>();
    const {detailId} = route.params;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProblem(detailId);
            setDetails(data);
            console.log(data?.uri);
        }
        fetchData();
    }, [])

    return <View style={styles.root}>
        <KeyboardAwareScrollView style={styles.scroll}  contentContainerStyle={styles.contentContainerStyle}>
            <Status status={details?.status} iconSize={24} fontSize={20}/>
            <SentDetails details={details}/>
            <Answer answer={details?.answer} searchKey={details?.searchId}/>
        </KeyboardAwareScrollView>
    </View>
}

export default DetailsScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.primary50,
        padding: 20,
        paddingVertical: 30,
        flexDirection: "column"
    },
    scroll: {
        width: '100%',
        height: '100%',
        flexDirection: "column",

    },
    contentContainerStyle: {
        flexDirection: "column",
        minHeight: '70%'
    },


})