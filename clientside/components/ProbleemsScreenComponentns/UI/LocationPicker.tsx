import {Alert, StyleSheet, View} from "react-native";
import PhotoButton from "./PhotoButton";
import {getCurrentPositionAsync, PermissionStatus, useForegroundPermissions} from "expo-location";
import {FC} from "react";


type props = {
    showModal: (s: boolean) => void
}
const LocationPicker: FC<props> = ({showModal}) => {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

    async function verifyPermission() {
        if (locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Nije dozvoljeno korištenje lokacije"
            );
            return false
        }
        return true;
    }

    async function locateUserHandler() {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        console.log(location);
    }

    function pickOnMapHandler() {
        showModal(true);
    }

    return <View style={styles.rootContainer}>
        <View style={styles.buttonContainer}>
            <PhotoButton onPress={locateUserHandler} icon={'location'} label={'Uključi lokaciju'}/>
            <PhotoButton onPress={pickOnMapHandler} icon={'map-sharp'} label={'Odaberi na mapi'}/>
        </View>
    </View>
}

export default LocationPicker;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    mapContainer: {
        flex: 2
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})