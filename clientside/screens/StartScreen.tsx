import {View, StyleSheet, Text} from "react-native";
import StartButton from "../components/startScreensComponents/StartButton";
import {Colors} from "../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React from "react";


const StartScreen= () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    function onPressGuestHandler() {
        navigation.navigate('ReportProblem');
    }

    function onPressLoginHandler() {
        navigation.navigate('Login');
    }
    function onPressReviewHandler() {
        navigation.navigate('ReviewProblems');
    }

    return <View style={styles.root}>
        <StartButton onPress={onPressGuestHandler} text={"Prijavi problem"}/>
        <StartButton onPress={onPressReviewHandler} text={"Pregledaj postojece prijave"}/>
        <Text style={styles.text}>Prijava za zaposlene</Text>
        <StartButton onPress={onPressLoginHandler} text={"Prijavi se"}/>
    </View>
}

export default StartScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: Colors.primary100
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        marginVertical: 14
    }
})
