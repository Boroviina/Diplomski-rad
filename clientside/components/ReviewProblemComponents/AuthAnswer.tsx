import {Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {FC, useEffect, useState} from "react";
import {Colors} from "../../constants/Colors";
import SeeDetailsButton from "./SeeDetailsButton";
import {getProblem, updateProblem} from "../../shared/services/problems.service";
import {formatDate} from "../../constants/formatDate";
import Email from "../email/Email";
import * as MailComposer from "expo-mail-composer";
import {ProblemModel} from "../../shared/models/problems.model";
import SendAnswerComponent from "./SendAnswerComponent";
import ShowAnswer from "./ShowAnswer";

type props = {
    answer: string | undefined;
    detailId: string | undefined;
    email?: string | undefined;
}
const AuthAnswer: FC<props> = ({answer, detailId, email}) => {
    const [edit, setEdit] = useState(false);
    const [editSent, setEditSent] = useState(false);
    const [details, setDetails] = useState<ProblemModel | undefined>();
    const [isAvailable, setIsAvailable] = useState(false);
    const [mail, setMail] = useState<string | undefined>('');
    let display;

    const fetchData = async () => {
        const data = await getProblem(detailId);
        setDetails(data);
    }
    const sendMail = () => {
        if (isAvailable && details?.contactEmail) {
            MailComposer.composeAsync({
                subject: 'Odgovor',
                body: mail,
                recipients: [details?.contactEmail],
            })
        }
    }
    useEffect(() => {
        fetchData();

        async function checkAvailability() {
            const isEmailAvalaible = await MailComposer.isAvailableAsync();
            setIsAvailable(isEmailAvalaible);
        }

        checkAvailability();
    }, [])


    useEffect(() => {
        if (editSent) {
            fetchData();
            setEdit(false);
            setEditSent(false);
        }
    }, [editSent])
    useEffect(()=>{
        sendMail();
    },[mail]);


    if (details?.answer && details.answer.length > 0) {
        display = <ShowAnswer answer={details?.answer} setEdit={setEdit}/>
    } else {
        display = <SendAnswerComponent detailId={detailId} setEditSent={setEditSent} setMail={setMail}/>
    }
    return <View style={{flex: 1}}>
        <Text style={styles.title}>Odgovor:</Text>
        {display}
        {edit && <Modal visible={edit} transparent={true}>
            <TouchableOpacity style={styles.modalContainer} onPress={() => setEdit(false)}>
                <SendAnswerComponent detailId={detailId} previewAnswer={answer} setEditSent={setEditSent} setMail={setMail}/>
            </TouchableOpacity>
        </Modal>}
    </View>
}

export default AuthAnswer;

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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        padding: 15
    },
})