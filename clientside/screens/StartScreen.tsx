import {View, StyleSheet, Text, ImageBackground} from "react-native";
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

    return <ImageBackground
        source={require( '../assets/backgroundPic.jpg')}
        style={styles.background}
    >
    <View style={styles.root}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Jednostavno prijavite Vaš problem.</Text>
        </View>


        <View style={styles.buttonContainer}>
            <StartButton onPress={onPressGuestHandler} text={"Prijavi problem"}/>
            <Text style={[styles.text, {marginVertical: 5}]}>ili</Text>
            <StartButton onPress={onPressReviewHandler} text={"Pregledaj postojeće prijave"}/>
            <View style={styles.prijava}>
                <Text style={styles.text}>Prijava za zaposlene</Text>
                <StartButton onPress={onPressLoginHandler} text={"Prijavi se"}/>
            </View>
        </View>
    </View>
    </ImageBackground>
}

export default StartScreen;

const styles = StyleSheet.create({
    background:{
        flex: 1,
    },
    root: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        marginVertical: 18,
        color: Colors.primary700
    },
    titleContainer:{
        flex: 2,
        justifyContent: "center",
        alignItems:"center",
        marginTop: 50
    },
    title:{
      textAlign:"center",
        color: Colors.primary700,
        fontSize:24
    },
    buttonContainer:{
        flex: 7,
        justifyContent:"flex-start",
        alignItems: "center",
        paddingTop: 50
    },
    prijava:{
        borderWidth: 1,
        borderRadius:16,
        borderColor:Colors.primary700,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        marginTop:10
    }
})
