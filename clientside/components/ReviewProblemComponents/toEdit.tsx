import {Alert, StyleSheet, Text, TextInput, View} from "react-native";
import SeeDetailsButton from "./SeeDetailsButton";
import {Colors} from "../../constants/Colors";
import {FC, useState} from "react";
import {updateProblem} from "../../shared/services/problems.service";

type props = {
    detailId: string;
}
const toEdit: FC<props> = ({detailId}) => {

    const [answerValue, setAnswerValue] = useState('');


    async function sendAnswer() {
        await updateProblem(detailId, {answer: answerValue});
        Alert.alert("Odgovor poslat!");
    }

    let component;

    component = <>
        <TextInput style={styles.answerInput}
                   multiline={true}
                   numberOfLines={8}
                   textAlignVertical={"top"}
                   cursorColor={Colors.primary700}
                   value={answerValue}
                   onChangeText={setAnswerValue}
        />
        <View style={styles.buttonContainer}>
            <SeeDetailsButton onPress={sendAnswer} label={'Pošalji odgovor'}/>
        </View>
    </>



return component;
}

export default toEdit;

const styles = StyleSheet.create({
    answerContainer: {
        marginVertical: 10
    },
    answerText: {
        color: Colors.primary700,
        fontSize: 17,
    },
    buttonContainer: {
        height: 40
    },
    answerInput: {
        backgroundColor: Colors.primary200,
        borderRadius: 12,
        marginVertical: 8,
        color: Colors.primary700,
        padding: 8,
        fontSize: 16,
    },
})