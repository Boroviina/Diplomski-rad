import {StyleSheet, Text, View} from "react-native";
import Body from "./UI/Body";
import Title from "./UI/Title";
import LoginButtons from "../startScreensComponents/LoginButtons";
import AddressInput from "./UI/AddressInput";
import {FC, useEffect, useState} from "react";
import {useProblem} from "../../shared/contexts/problem-context";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {SearchIdGenerator} from "../../shared/contexts/helper/searchIdGenerator";
import {Colors} from "../../constants/Colors";

type props = {
    onConfirm: (confirmed: boolean) => void
    onBack: (confirmed: boolean) => void
}
const Contact: FC<props> = ({onConfirm, onBack}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const {problem, setProblem} = useProblem();

    useEffect(() => {
        setName(problem.contactName || '');
        setPhone(problem.phoneNumber || '');
        setEmail(problem.contactEmail || '');
    }, [problem])

    function nextHandler() {
        const generatedId=SearchIdGenerator();
        setProblem({...problem, contactName: name, phoneNumber: phone, searchId: generatedId, contactEmail: email});
        onConfirm(true);
    }

    function backHandler() {
        onBack(true);
    }

    return <Body>
        <KeyboardAwareScrollView style={styles.scroll} contentContainerStyle={styles.contentContainerStyle}>
            <Title>Prijava je anonimna. {'\n'}Ukoliko želite da Vas kontaktiramo za više detalja, ostavite kontakt podatke.</Title>
            <View style={styles.inputContainer}>
                <AddressInput label={"Ime i prezime"} value={name} onChangeText={setName} must={false}/>
                <AddressInput label={"Broj telefona"} value={phone} onChangeText={setPhone} must={false}/>
                <AddressInput label={"E-mail adresa"} value={email} onChangeText={setEmail} must={false}/>
            </View>
            <View style={styles.buttonContainer}>
                <LoginButtons onPress={nextHandler} children={"Dalje"}/>
                <LoginButtons onPress={backHandler} children={"Nazad"}/>
            </View>
        </KeyboardAwareScrollView>
    </Body>

}

export default Contact;

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 2,
        justifyContent: "center"
    },
    scroll: {
        width: '100%',
        height: '100%',
        flexDirection: "column",

    },
    contentContainerStyle: {
        flexDirection: "column",
        minHeight: '80%'
    },
    inputContainer: {
        flex: 2,
        height: '20%',
        borderWidth: 1,
        borderColor: Colors.primary700,
        borderRadius: 16,
        marginTop: 10
    },
})
