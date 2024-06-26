import {View, StyleSheet, Text} from "react-native";
import AddressInput from "./UI/AddressInput";
import Title from "./UI/Title";
import LoginButtons from "../startScreensComponents/LoginButtons";
import Body from "./UI/Body";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {FC, useEffect, useState} from "react";
import {useProblem} from "../../shared/contexts/problem-context";
import {Colors} from "../../constants/Colors";

type props = {
    onConfirm: (confirm: boolean) => void
    onBack: (confirm: boolean) => void
}
const AddAddress: FC<props> = ({onConfirm, onBack}) => {
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [locationDescription, setLocationDescription] = useState('');
    const {problem, setProblem} = useProblem();

    useEffect(() => {
        setCity(problem.city || '');
        setStreet(problem.street || '');
        setLocationDescription(problem.locationDescription || '');
        console.log("Ovo su slike> ", problem.uri);
    }, [problem]);

    function nextHandler() {
        setProblem({...problem, city: city, street: street, locationDescription: locationDescription});
        onConfirm(true);
    }

    function backHandler() {
        onBack(false);
    }

    return <Body>
        <KeyboardAwareScrollView style={styles.scroll} contentContainerStyle={styles.contentContainerStyle}>
            <Title>Unesite adresu na kojoj je identifikovan problem</Title>
            <View style={styles.inputContainer}>
                <AddressInput label={"Opstina:"} value={city} onChangeText={setCity} must={true}/>
                <AddressInput label={"Ulica:"} value={street} onChangeText={setStreet} must={true}/>
                <AddressInput label={"Preciznije opisi lokaciju:"} onChangeText={setLocationDescription}
                              value={locationDescription} multiline={true} numberOfLines={4} must={true}/>
                <Text style={styles.star}>* Obavezno popuniti</Text>
            </View>
            <View style={styles.buttonContainer}>
                <LoginButtons onPress={nextHandler} children={"Dalje"}/>
                <LoginButtons onPress={backHandler} children={"Nazad"}/>
            </View>
        </KeyboardAwareScrollView>
    </Body>
}

export default AddAddress;

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
        minHeight: '90%'
    },
    inputContainer: {
        flex: 2,
        height: '20%',
        borderWidth: 1,
        borderColor: Colors.primary700,
        borderRadius: 16,
        marginTop: 10
    },
    star: {
        color: '#a11111',
        fontSize: 12,
        textAlign: "right",
        marginHorizontal:15,
        marginVertical: 6
    },


})