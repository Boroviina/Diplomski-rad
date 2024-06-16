import {FC, useEffect, useState} from "react";
import {Text} from "react-native";
import {ProblemModel} from "../../shared/models/problems.model";
import {getProblem, updateProblem} from "../../shared/services/problems.service";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Status from "./Status";
import SentDetails from "./SentDetails";
import Answer from "./Answer";
import {Alert, StyleSheet, View} from "react-native";
import {Colors} from "../../constants/Colors";
import {useAuth} from "../../shared/contexts/auth-context";
import AuthAnswer from "./AuthAnswer";

type props = {
    detailId: string;
}

const DetailComponent: FC<props> = ({detailId}) => {
    const [details, setDetails] = useState<ProblemModel | undefined>();
    const {auth}=useAuth();
    useEffect(() => {
        const fetchData = async () => {
            const data = await getProblem(detailId);
            setDetails(data);
        }
        fetchData();
    }, [])

    return <View style={styles.root}>
        <KeyboardAwareScrollView style={styles.scroll} contentContainerStyle={styles.contentContainerStyle}>
            <Status status={details?.status} iconSize={20} fontSize={18}/>
            <SentDetails details={details}/>
            {}

            {auth? <AuthAnswer answer={details?.answer} detailId={detailId}/> :<Answer answer={details?.answer}
                                                                   searchKey={details?.searchId}
                                                                   detailId={detailId}/>
            }
        </KeyboardAwareScrollView>
    </View>
}

export default DetailComponent;

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