import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SeeDetailsButton from "./SeeDetailsButton";
import {Colors} from "../../constants/Colors";
import {FC, useState} from "react";
import SendAnswerComponent from "./SendAnswerComponent";

type props = {
    answer: string | undefined;
    setEdit: (state: boolean) => void;
}

const showAnswer: FC<props> = ({answer, setEdit}) => {

    function editAnswer() {
        setEdit(true);
    }

    return <>
        <View style={styles.answerContainer}>
            <Text style={styles.answerText}>{answer}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <SeeDetailsButton onPress={editAnswer} label={'Izmijeni odgovor'}/>
        </View>

    </>
}

export default showAnswer;

const styles = StyleSheet.create({
    answerContainer: {
        paddingVertical: 10,
        marginVertical: 10,
        justifyContent: "flex-start",

    },
    answerText: {
        color: Colors.primary700,
        fontSize: 17,
    },
    buttonContainer: {
        height: 40
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        padding: 15
    },
})