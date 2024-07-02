import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {ProblemType} from "../../shared/enums/problemType.enum";
import {Colors} from "../../constants/Colors";
import {FC, useEffect, useState} from "react";
import {ProblemModel} from "../../shared/models/problems.model";
import PressableImage from "./PressableImage";
import {Video} from "expo-av";
import PictureModal from "./PictureModal";
import {formatDate} from "../../constants/formatDate";
import MapView, {Marker} from "react-native-maps";

type props = {
    details: ProblemModel | undefined
}

function getEnumValueByKey(enumObj: any, key: string): string {
    return enumObj[key as keyof typeof enumObj] || key;
}

const SentDetails: FC<props> = ({details}) => {

    const [selectedImageUri, setSelectedImageUri] = useState<string | undefined>(undefined);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const renderMedia = (uri: string, index: number) => {
        const fileExtension = uri.split('.').pop();

        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension!)) {
            return (
                <PressableImage uri={uri} onPress={onTap} key={index}/>
            );
        } else if (['mp4', 'mov', 'avi'].includes(fileExtension!)) {
            return (
                <Pressable key={uri} style={styles.pressable} onPress={() => onTap(uri)}>
                    <View key={uri} style={styles.imagePreview}>
                        <Video
                            source={{uri}}
                            style={styles.image}
                            isMuted={true}
                        />
                    </View>
                </Pressable>
            );
        } else {
            return (
                <View key={uri} style={styles.imagePreview}>
                    <Text>Unsupported media type</Text>
                </View>
            );
        }
    };

    function closeModal() {
        setIsModalVisible(false);
    }

    function onTap(uri: string) {
        setSelectedImageUri(uri);
        setIsModalVisible(true);
    }
    let address;
    if (details?.street){
        address= <>
            <Text style={styles.header}>Adresa</Text>
            <Text style={styles.text}>{details?.street}</Text>
            <Text style={styles.text}>{details?.locationDescription}</Text>
        </>
    }else if (details?.lat && details?.lng){
        address = <View style={styles.mapContainer}>
            <MapView style={styles.mapContainer} initialRegion={details?.region}>
                <Marker coordinate={{latitude: details?.lat, longitude: details?.lng}}
                        title={"Odabrana lokacija"}
                />
            </MapView>
        </View>
    }
    let contact;
    if (details?.contactName || details?.contactEmail || details?.phoneNumber) {
        contact = <>
            <Text style={styles.header}>Kontakt</Text>
            <Text style={styles.text}>{details?.contactName}</Text>
            <Text style={styles.text}>{details?.phoneNumber}</Text>
            <Text style={styles.text}>{details?.contactEmail}</Text>
        </>
    }


    return <View style={{flex: 1}}>
        <View style={styles.dateContainer}>
            <Text style={[styles.title, {flex: 1}]}>Poslati podaci:</Text>
            <Text style={[styles.title, {flex: 1, textAlign: 'right'}]}>{formatDate(details?.createdAt?.toString())}</Text>
        </View>
        <Text
            style={[styles.text, {
                fontWeight: 'bold',
                fontSize: 18
            }]}>{details?.problemType ? getEnumValueByKey(ProblemType, details.problemType) : "Tip nije definisan"}</Text>
        <Text></Text>
        <Text style={styles.text}>{details?.description}</Text>
        {address}
        {contact}
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
            {details?.uri?.map(renderMedia)}
        </ScrollView>
        {selectedImageUri && (
            <PictureModal uri={selectedImageUri} visible={isModalVisible} onClose={closeModal}/>)
        }

        <Text></Text>

    </View>
}
export default SentDetails;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderColor: Colors.primary700,
        color: Colors.primary700,
        marginVertical: 10,
        padding: 4
    },
    text: {
        color: Colors.primary700,
        fontSize: 17,
        paddingVertical: 1
    },
    header: {
        color: Colors.primary700,
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5,
        borderBottomWidth: 0.5,
        borderColor: Colors.primary700,
        width: '20%',
        paddingVertical: 1
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    scrollViewContent: {
        flexDirection: "row",
        alignItems: "flex-start"
    },
    imagePreview: {
        width: '100%',
        height: 100,
        marginHorizontal: 6,
        justifyContent: 'center',
        alignItems: "center",
    },
    image: {
        width: 80,
        height: 80,
    },
    pressable: {
        width: '21%',
        height: '100%',
        marginHorizontal: 5,
        marginVertical: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    dateContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    mapContainer: {
        height: 150,
        width: "auto",
        marginVertical: 5
    }
})