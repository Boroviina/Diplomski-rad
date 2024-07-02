import {Alert, Image, ScrollView, StyleSheet, Text, View, ToastAndroidStatic, ToastAndroid} from "react-native";
import Title from "./UI/Title";
import LoginButtons from "../startScreensComponents/LoginButtons";
import {useProblem} from "../../shared/contexts/problem-context";
import {createProblem} from "../../shared/services/problems.service";
import {ProblemModel} from "../../shared/models/problems.model";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Colors} from "../../constants/Colors";
import {FC} from "react";
import {ProblemType} from "../../shared/enums/problemType.enum";
import * as Clipboard from 'expo-clipboard';
import MapView, {Marker} from "react-native-maps";

type props = {
    onBack: (confirm: boolean) => void;
}

function getEnumValueByKey(enumObj: any, key: string): string {
    return enumObj[key as keyof typeof enumObj] || key;
}

const Confirmation: FC<props> = ({onBack}) => {
    const {problem} = useProblem();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();


    async function copyToClipboard(text: string) {
        await Clipboard.setStringAsync(text);
        ToastAndroid.show("Ključ je uspješno kopiran!", ToastAndroid.LONG);
    }

    function nextHandler() {
        createProblem(problem as ProblemModel)
            .then(() => {
                Alert.alert("Uspjesno ste prijavili problem",
                    `Pratite prijavu uz kod za pretragu: \n${problem.searchId}`,
                    [
                        {text: "OK"},
                        {text: "Kopiraj kod", onPress: () => copyToClipboard(problem.searchId || '')}
                    ]
                );
                navigation.navigate('StartScreen');
            })
            .catch((error) => {
                Alert.alert("Greska", "Doslo je do greske prilikom prijave problema")
                console.error(error.response);
                console.error(error.message);
            })

    }

    function backHandler() {
        onBack(true);
    }

    let address;
    let contact;

    if (problem.street) {
        address = <>
            <Text style={styles.headerStyle}>Adresa</Text>
            <Text style={styles.contentStyle}>{problem.street}</Text>
            <Text style={styles.contentStyle}>{problem.locationDescription}</Text>
        </>
    } else {
        address = <View style={styles.mapContainer}>
            <MapView style={styles.mapContainer} initialRegion={problem.region}>
                <Marker coordinate={{latitude: problem.lat, longitude: problem.lng}}
                        title={"Odabrana lokacija"}
                />
            </MapView>
        </View>
    }
    if (problem.contactName || problem.contactEmail || problem.phoneNumber) {
        contact = <>
            <Text style={styles.headerStyle}>Kontakt</Text>
            <Text style={styles.contentStyle}>{problem.contactName}</Text>
            <Text style={styles.contentStyle}>{problem.phoneNumber}</Text>
            <Text style={styles.contentStyle}>{problem.contactEmail}</Text>
        </>
    }

    return <View style={styles.root}>
        <Title>Pregledajte prijavu, a zatim potrvrdite!</Title>
        <View style={{flex: 4, paddingVertical: 5}}>
            <ScrollView style={styles.scroll}>
                <Text style={styles.headerStyle}>Vrsta problema</Text>
                <Text
                    style={styles.contentStyle}>{problem.problemType ? getEnumValueByKey(ProblemType, problem.problemType) : "Tip nije definisan"}</Text>
                <Text style={styles.headerStyle}>Opis</Text>
                <Text style={styles.contentStyle}>{problem.description}</Text>
                <Text style={styles.headerStyle}>Slike</Text>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                    {problem.uri?.map((uri, index) =>
                        (<View key={index} style={styles.imagePreview}>
                                <Image source={{uri}} style={styles.image}/>
                            </View>
                        ))}
                </ScrollView>
                {address}
                {contact}
            </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
            <LoginButtons onPress={nextHandler} children={"Potvrdi"}/>
            <LoginButtons onPress={backHandler} children={"Nazad"}/>
        </View>
    </View>
}

export default Confirmation;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 5
    },
    buttonContainer: {
        flex: 2,
        justifyContent: "center"
    },
    headerStyle: {
        color: Colors.primary700,
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 6
    },
    contentStyle: {
        color: Colors.primary700,
        fontSize: 18,
        marginVertical: 2
    },
    scrollView: {
        flex: 1,
        width: '100%'
    },
    scrollViewContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    imagePreview: {
        width: '20%',
        height: 80,
        marginHorizontal: 6,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Colors.primary200,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    scroll: {
        flex: 1,
        minHeight: '100%',
        backgroundColor: Colors.primary200,
        paddingHorizontal: 12,
        borderRadius: 16
    },
    mapContainer: {
        height: 150,
        width: "auto",
        marginVertical: 5
    }
})