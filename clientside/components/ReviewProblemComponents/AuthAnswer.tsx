import {Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {FC, useEffect, useState} from "react";
import {Colors} from "../../constants/Colors";
import SeeDetailsButton from "./SeeDetailsButton";
import {getProblem, updateProblem} from "../../shared/services/problems.service";

type props = {
    answer: string | undefined;
    detailId: string;
}
const AuthAnswer: FC<props> = ({answer, detailId}) => {
    const [answerValue, setAnswerValue] = useState('');
    const [newValue, setNewValue] = useState<string | undefined>('');
    const [edit, setEdit] = useState(false);
    const [editSent, setEditSent] = useState(false);
    const [modalVisible, setIsModalVisible] = useState(false)
    let display;

    async function sendAnswer() {
        await updateProblem(detailId, {answer: answerValue});
        Alert.alert("Odgovor poslat!");
        if (edit){
            setEdit(false);
            setEditSent(true);
            setNewValue(answerValue);
        }else {
            setNewValue(answerValue);
        }

        console.log(newValue);
    }

    function editAnswer() {
        setEdit(true);
        setIsModalVisible(true)
        setEditSent(false);
        if (answer && answer.length > 0) {
            setAnswerValue(answer);
            return;
        }
        if (newValue && newValue.length > 0) {
            setAnswerValue(newValue);
            return;
        }
    }

    useEffect(() => {
        async function getData() {
            const data = await getProblem(detailId);
            setNewValue(data?.answer);
        }

        getData();
    }, [editSent])


    if ((answer && answer.length > 0) || newValue) {
        if (editSent) {
            display = <>
            <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{newValue}</Text>
            </View>
                <View style={styles.buttonContainer}>
                    <SeeDetailsButton onPress={editAnswer} label={'Izmijeni odgovor'}/>
                </View>
            </>
        } else {
            display = <>
                <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{answer ? answer : newValue}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <SeeDetailsButton onPress={editAnswer} label={'Izmijeni odgovor'}/>
                </View>
            </>
        }
    } else {
        display = <>
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
    }
    return <View style={{flex: 1}}>
        <Text style={styles.title}>Odgovor:</Text>
        {display}
        {edit && <Modal visible={modalVisible} transparent={true}>
            <TouchableOpacity style={styles.modalContainer} onPress={() => setIsModalVisible(false)}>
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
            </TouchableOpacity>
        </Modal>}
    </View>
}

export default AuthAnswer;

const styles = StyleSheet.create({
    answerText: {
        color: Colors.primary700,
        fontSize: 17,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderColor: Colors.primary700,
        color: Colors.primary700,
        marginVertical: 10,
        padding: 4
    },
    answerInput: {
        backgroundColor: Colors.primary200,
        borderRadius: 12,
        marginVertical: 8,
        color: Colors.primary700,
        padding: 8,
        fontSize: 16,
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
    answerContainer:{
        paddingVertical: 10,
        marginVertical: 10,
        justifyContent: "flex-start",

    }
})