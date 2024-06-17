import {FC, useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "../../constants/Colors";

type props = {
    answer: string | undefined;
    searchKey: string | undefined;
    detailId: string;
}
const Answer: FC<props> = ({answer, searchKey, detailId}) => {
    const [code, setCode] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function showAnswerHandler() {
        if (code === searchKey) {
            setShowAnswer(true);
            setError(null);
        } else {
            setError("Unijeli ste pogresan kod!")
        }
    }


    let problemAnswer;
    if (showAnswer) {
        if (answer)
            problemAnswer = <Text style={styles.answerText}>{answer}</Text>
        else {
            problemAnswer = <Text style={styles.answerText}>Još niste dobili odgovor!</Text>
        }
    } else {
        problemAnswer = <View style={styles.root}>
            <Text style={styles.text}>Unesite kod vase prijave da biste mogli pristupiti odgovoru</Text>
            <TextInput style={styles.input}
                       value={code}
                       onChangeText={setCode}
                       cursorColor={Colors.primary700}
            />
            {error && <Text style={styles.text}>{error}</Text>}
            <Pressable onPress={showAnswerHandler} style={styles.button}>
                <View>
                    <Text style={{color: Colors.primary100}}>Vidi odgovor</Text>
                </View>
            </Pressable>
        </View>
    }


    return <View style={{flex: 1}}>
        <Text style={styles.title}>Odgovor:</Text>
        {problemAnswer}
    </View>
}


export default Answer;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderColor: Colors.primary700,
        color: Colors.primary700,
        marginVertical: 10,
        padding: 4
    },
    text: {
        color: Colors.primary700,
        fontSize: 16,
        fontStyle: "italic",
        textAlign: "center",
        padding: 5,
    },
    input: {
        backgroundColor: Colors.primary200,
        padding: 8,
        width: '80%',
        borderRadius: 16,
        fontSize:16,
        color: Colors.primary700,
        fontWeight: "bold",
        textAlign: "center"
    },
    button: {
        backgroundColor: Colors.primary700,
        padding: 5,
        borderRadius: 12,
        width: '50%',
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15
    },
    root: {
        justifyContent: "center",
        alignItems: "center",

    },
    answerText: {
        color: Colors.primary700,
        fontSize: 17,
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
    answerContainer: {
        marginVertical: 10
    }
})