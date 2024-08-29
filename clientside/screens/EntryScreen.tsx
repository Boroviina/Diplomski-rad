import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Colors} from "../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../types/types";


const EntryScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>()

    function nextHandler() {
        navigation.navigate('StartScreen');
    }

    return <View style={styles.root}>
        <Image source={require('../assets/backgroundPic.jpg')} style={styles.image}/>
        <Text style={styles.message}>{'\t\t\t\t'}Prijavite {'\n\t\t\t\t\t\t'}komunalne probleme {'\n\t\t\t'}i doprinesite {'\n\t\t\t\t\t\t\t\t\t'}poboljšanju
            kvaliteta života {'\n\t\t\t\t\t'}svih građana.</Text>
        <Pressable style={styles.button} onPress={nextHandler}>
            <Text style={styles.buttonText}>Nastavi </Text>
            <Ionicons name={'arrow-forward-sharp'} size={26} color={Colors.primary700}/>
        </Pressable>
    </View>
}

export default EntryScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.primary50
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    button: {
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        flexDirection: "row",
        bottom: 100,
        left: '70%',
    },
    buttonText: {
        fontSize: 20,
        color: Colors.primary700
    },
    message: {
        position: "absolute",
        bottom:140,
        textAlign: "left",
        color: Colors.primary700,
        left: 10,
        fontSize: 16,
        fontWeight: "bold"
    }
})