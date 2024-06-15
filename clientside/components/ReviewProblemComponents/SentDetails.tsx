import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {ProblemType} from "../../shared/enums/problemType.enum";
import {Colors} from "../../constants/Colors";
import {FC, useState} from "react";
import {ProblemModel} from "../../shared/models/problems.model";
import PressableImage from "./PressableImage";
import {Video} from "expo-av";
import PictureModal from "./PictureModal";

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
                            useNativeControls
                            isLooping
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

    return <View style={{flex: 1}}>
        <Text style={styles.title}>Poslati podaci:</Text>
        <Text
            style={styles.text}>{details?.problemType ? getEnumValueByKey(ProblemType, details.problemType) : "Tip nije definisan"}</Text>
        <Text style={styles.text}>{details?.description}</Text>
        <Text style={styles.header}>Adresa</Text>
        <Text style={styles.text}>{details?.city}</Text>
        <Text style={styles.text}>{details?.street}</Text>
        <Text style={styles.text}>{details?.locationDescription}</Text>
        <Text style={styles.header}>Kontakt</Text>
        <Text style={styles.text}>{details?.contactName}</Text>
        <Text style={styles.text}>{details?.phoneNumber}</Text>
        <Text style={styles.text}>{details?.contactEmail}</Text>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
            {details?.uri?.map(renderMedia)}
        </ScrollView>
        {selectedImageUri && (
            <PictureModal uri={selectedImageUri} visible={isModalVisible} onClose={closeModal}/>)
        }
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
        fontSize: 16,
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
        width: '100%',
        height: '100%',
    },
    pressable: {
        width: '21%',
        height: '100%',
        marginHorizontal: 5,
        marginVertical: 2,
        justifyContent: "center",
        alignItems: "center",
    },
})