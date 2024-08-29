import {View, StyleSheet, Text, Pressable, Modal} from "react-native";
import AddressInput from "./UI/AddressInput";
import Title from "./UI/Title";
import LoginButtons from "../startScreensComponents/LoginButtons";
import Body from "./UI/Body";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {FC, useEffect, useState} from "react";
import {useProblem} from "../../shared/contexts/problem-context";
import {Colors} from "../../constants/Colors";
import {ComunityTypes} from "../../shared/enums/ComunityTypes";
import LocationPicker from "./UI/LocationPicker";
import Map from "./UI/Map";
import MapView, {Marker} from "react-native-maps";

type props = {
    onConfirm: (confirm: boolean) => void
    onBack: (confirm: boolean) => void
}

const communityTypeOptions = Object.values(ComunityTypes).map((value, label) => ({
    label: value,
    value: Object.keys(ComunityTypes).find(key => ComunityTypes[key as keyof typeof ComunityTypes] === value)
}))

const AddAddress: FC<props> = ({onConfirm, onBack}) => {
    const {problem, setProblem} = useProblem();
    const [street, setStreet] = useState('');
    const [locationDescription, setLocationDescription] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [locationPicked, setLocationPicked] = useState(false);


    useEffect(() => {
        setStreet(problem.street || '');
        setLocationDescription(problem.locationDescription || '');
    }, [problem]);

    const setLocation = (lat: number, lng: number) => {
        const region = {
            latitude: lat, longitude: lng, latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }
        setProblem({...problem, lat: lat, lng: lng, region: region});
        setLocationPicked(true);
    };

    useEffect(()=>{},[locationPicked])

    function nextHandler() {
        setProblem({...problem, street: street, locationDescription: locationDescription});
        onConfirm(true);
    }

    function backHandler() {
        onBack(false);
    }

    return <Body>
        <KeyboardAwareScrollView style={styles.scroll} contentContainerStyle={styles.contentContainerStyle}>
            <Title>Unesite adresu na kojoj je uočen problem</Title>
            <View style={styles.inputContainer}>
                {(locationPicked && problem.lat && problem.lng && problem.region) ? <View style={styles.mapContainer}>
                    <MapView style={styles.mapContainer} initialRegion={problem.region}>
                        <Marker coordinate={{latitude: problem.lat, longitude: problem.lng}}
                                title={"Odabrana lokacija"}
                        />
                    </MapView>
                </View> : <>
                    <AddressInput label={"Ulica:"} value={street} onChangeText={setStreet} must={true}/>
                    <AddressInput label={"Preciznije opiši lokaciju:"} onChangeText={setLocationDescription}
                                  value={locationDescription} multiline={true} numberOfLines={6} scrollEnabled={true}
                                  minHeight={100} must={true}/>
                    <Text style={styles.star}>* Obavezno popuniti</Text>
                </>
                }

            </View>
            <View>
                <Text style={styles.orText}>ili</Text>
            </View>
            <View style={styles.containerButton}>
                <LocationPicker showModal={setShowModal} setLocation={setLocation}/>
            </View>


            <View style={styles.buttonContainer}>
                <LoginButtons onPress={nextHandler} children={"Dalje"}/>
                <LoginButtons onPress={backHandler} children={"Nazad"}/>
            </View>
            {showModal && <Modal visible={showModal}>
                <Map setShowModal={setShowModal} locationConfirmed={setLocation}/>
            </Modal>}
        </KeyboardAwareScrollView>
    </Body>
}

export default AddAddress;

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center"
    },

    scroll: {
        width: '100%',
        height: '100%',
        flexDirection: "column",

    },
    orText: {
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 5,
        color: Colors.primary700,
        fontWeight: "bold"
    },
    contentContainerStyle: {
        flexDirection: "column",
        minHeight: '90%'
    },
    inputContainer: {
        flex: 4,
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
        marginHorizontal: 15,
        marginVertical: 6
    },
    container: {
        flexDirection: "column",
        padding: 20,
        flex: 1
    },
    text: {
        color: Colors.primary700,
        fontWeight: "bold",
        fontSize: 16
    },
    starr: {
        color: '#a11111',
        fontWeight: "bold",
        fontSize: 18
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    mapContainer: {
        flex: 1,
        height: 300,
        borderRadius: 16
    },
    containerButton: {
        height: 60,
        justifyContent: "center",
        flexDirection: "column"
    }

})

const pickerStyle = StyleSheet.create({
    inputIOS: {},
    inputAndroid: {
        fontWeight: "bold",
        backgroundColor: Colors.primary700,
        color: 'white',
        paddingVertical: 16,
        marginTop: 5,
        fontSize: 26,
        borderRadius: 14
    }
})