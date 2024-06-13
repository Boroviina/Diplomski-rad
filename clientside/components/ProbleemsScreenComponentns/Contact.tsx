import {StyleSheet, Text, View} from "react-native";
import Body from "./UI/Body";
import Title from "./UI/Title";
import LoginButtons from "../startScreensComponents/LoginButtons";
import AddressInput from "./UI/AddressInput";
import {FC, useEffect, useState} from "react";
import {useProblem} from "../../shared/contexts/problem-context";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {SearchIdGenerator} from "../../shared/contexts/helper/searchIdGenerator";

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
            <Title>Prijave su anonimne, ukoliko želite da ostavite kontakt popunite formu, u suprotnom pritisnite
                opciju dalje.</Title>
            <View style={{flex: 2, height: '20%'}}>
                <AddressInput label={"Ime i prezime"} value={name} onChangeText={setName}/>
                <AddressInput label={"Broj telefona"} value={phone} onChangeText={setPhone}/>
                <AddressInput label={"E-mail adresa"} value={email} onChangeText={setEmail}/>
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
})
