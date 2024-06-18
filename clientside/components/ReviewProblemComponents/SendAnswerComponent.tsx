import {Alert, StyleSheet, TextInput, View} from "react-native";
import {Colors} from "../../constants/Colors";
import SeeDetailsButton from "./SeeDetailsButton";
import {getProblem, updateProblem} from "../../shared/services/problems.service";
import {FC, useEffect, useState} from "react";
import * as MailComposer from "expo-mail-composer";
import {ProblemModel} from "../../shared/models/problems.model";

type props = {
    detailId: string | undefined;
    previewAnswer?: string | undefined;
    setEditSent: (s: boolean) => void;
    setMail: (s: string) => void;
}
const SendAnswerComponent: FC<props> = ({detailId, previewAnswer, setEditSent, setMail}) => {
    const [answerValue, setAnswerValue] = useState<string | undefined>('');
    const [details, setDetails] = useState<ProblemModel | undefined>();

    const fetchData = async () => {
        const data = await getProblem(detailId);
        setDetails(data);
    }

    useEffect(() => {

        if (previewAnswer && previewAnswer?.length > 0) {
            setAnswerValue(previewAnswer);
        }
    }, [previewAnswer])


    async function sendAnswer() {
        await updateProblem(detailId, {answer: answerValue});
        setMail(answerValue);
        Alert.alert("Poslali ste odgovor!");
        await fetchData();
        setEditSent(true);
    }

    return (<>
        <TextInput style={styles.answerInput}
                   multiline={true}
                   scrollEnabled={true}
                   numberOfLines={8}
                   textAlignVertical={"top"}
                   cursorColor={Colors.primary700}
                   value={answerValue}
                   onChangeText={setAnswerValue}
        />
        <View style={styles.buttonContainer}>
            <SeeDetailsButton onPress={sendAnswer} label={'Pošalji odgovor'}/>
        </View>
    </>)
}
export default SendAnswerComponent;

const styles = StyleSheet.create({
    answerInput: {
        backgroundColor: Colors.primary200,
        maxHeight: 250,
        borderRadius: 12,
        marginVertical: 8,
        color: Colors.primary700,
        padding: 8,
        fontSize: 16,
    },
    buttonContainer: {
        height: 40
    },
})