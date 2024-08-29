import MapView, {Marker} from "react-native-maps";
import {Alert, StyleSheet, View} from "react-native";
import {FC, useEffect, useState} from "react";
import PhotoButton from "./PhotoButton";
import {Colors} from "../../../constants/Colors";
import {useProblem} from "../../../shared/contexts/problem-context";



type Location = {
    lat: number;
    lng: number;

}
type Region = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}
type props = {
    setShowModal: (s: boolean) => void;
    locationConfirmed: (lat: number, lng: number) => void;
}

const Map: FC<props> = ({setShowModal, locationConfirmed}) => {
    const {setProblem, problem} = useProblem();
    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);
    const [lang, setLat] = useState<number | null>(null);
    const [long, setLng] = useState<number | null>(null);
    const [changeRegion, setChangeRegion] = useState(false);
    const [region, setRegion] = useState<Region | undefined>({
        latitude: 43.8120,
        longitude: 18.359,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    })


    function selectLocationHandler(event: any) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setLng(lng);
        setLat(lat);

        setSelectedLocation({lat: lat, lng: lng})

    }

    function closeModal() {
        setShowModal(false)
    }

    // useEffect(() => {
    //     if (selectedLocation) {
    //         setLng(selectedLocation.lng);
    //         setLat(selectedLocation.lat);
    //         setChangeRegion(true)
    //     }
    //
    //     console.log("Ovo je selektovana lokacija:", selectedLocation);
    //     console.log("Ovo je selektovana region:", region);
    // }, [selectedLocation])

    // useEffect(() => {
    //     if (selectedLocation) {
    //         setRegion({
    //             latitude: selectedLocation.lat,
    //             longitude: selectedLocation.lng,
    //             latitudeDelta: 0.005,
    //             longitudeDelta: 0.005
    //         })
    //     }
    // }, [changeRegion])


    function savePickedLocation() {
        if (!selectedLocation) {
            Alert.alert(
                'Niste odabrali lokaciju',
                'Odaberite lokaciju klikom na mapu!'
            )
            return;
        }

        // setProblem({...problem, lng: long, lat: lang, region: region})
        locationConfirmed(lang, long);
        setShowModal(false);
    }


    return <View style={{flex: 1}}>
        <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
            {selectedLocation &&
                <Marker coordinate={{latitude: selectedLocation?.lat, longitude: selectedLocation?.lng}}
                        title={"Odabrana lokacija"}
                />}
        </MapView>
        <View style={styles.buttonContainerModal}>
            <PhotoButton onPress={closeModal} icon={'close-outline'} label={'Zatvori'}/>
            <PhotoButton onPress={savePickedLocation} icon={'checkmark-done-sharp'} label={'Potvrdi lokaciju'}/>
        </View>
    </View>
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    buttonContainerModal: {
        flexDirection: "row",
        backgroundColor: Colors.primary50,
        height: 50
    },
})