import {Button, Image, Text, View, StyleSheet, ScrollView, Pressable} from "react-native";
import {launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions} from 'expo-image-picker';
import {FC, useEffect, useState} from "react";
import {Colors} from "../../../constants/Colors";
import {useProblem} from "../../../shared/contexts/problem-context";
import PhotoButton from "./PhotoButton";

type props = {
    setPhoto: (photos: string[]) => void;
}
const ImagePicker: FC<props> = ({setPhoto}) => {
    const [imageData, setImageData] = useState<string[]>([]);
    const {problem} = useProblem()

    async function takeImageHandler() {
        const image = await launchCameraAsync({
            aspect: [16, 9],
            quality: 0.7
        })
        if (!image.canceled && image.assets && image.assets.length > 0) {
            setImageData((currentImages) => [...currentImages, image.assets[0].uri]);
        }
    }

    async function chooseImageHandler() {
        const image = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.All,
            selectionLimit: 4,
            aspect: [16, 9],
            quality: 0.7
        })

        if (!image.canceled && image.assets && image.assets.length > 0) {
            setImageData((currentImages) => [...currentImages, image.assets[0].uri]);
        }
    }

    function removePhoto(uri: string) {
        setImageData((currentImages) => currentImages.filter((imageUri) => imageUri !== uri));
        console.log("Nakon brisanja: ", imageData);
    }

    useEffect(() => {
        setImageData(problem.uri || []);
    }, [problem]);

    useEffect(() => {
        // console.log('Photo data', problem.uri || []);
        // console.log('Image data updated:', imageData);
        setPhoto(imageData || []);
    }, [imageData])

    let imagePreview = (<View style={styles.textContainer}>
        <Text style={styles.text}>Pošaljite nam Vaše slike! (opciono)</Text>
    </View>)

    if (imageData.length > 0) {
        imagePreview = (
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                    {imageData.map((uri, index) =>
                        (<Pressable key={index} style={styles.pressable} onPress={() => removePhoto(uri)}>
                                <View key={index} style={styles.imagePreview}>
                                    <Image source={{uri}} style={styles.image}/>
                                </View>
                            </Pressable>
                        ))}
            </ScrollView>
        )
    }

    return <View style={styles.container}>
        <View style={styles.imageContainer}>
            {imagePreview}
        </View>
        {imageData.length>0 && <Text style={styles.instruction}>Pritisni na sliku za njeno uklanjanje</Text>}
        <View style={styles.buttonContainer}>
            <PhotoButton onPress={takeImageHandler} label={"Fotoaparat"} icon={'camera'}/>
            <PhotoButton onPress={chooseImageHandler} icon={'add-circle-outline'} label={"Galerija"}/>
        </View>
    </View>
}

export default ImagePicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 100,
        marginVertical: 15,
        justifyContent:"center",
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        marginVertical: 5
    },
    instruction:{
        color: Colors.primary700,
        marginVertical:5,
        marginHorizontal:90,
        fontSize:11
    },
    pressable: {
        width: '21%',
        height: '100%',
        marginHorizontal: 5,
        marginVertical: 2,
        justifyContent: "center",
        alignItems: "center",
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
        backgroundColor: Colors.primary200,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        flexDirection: "row"
    },
    text: {
        color: Colors.primary700,
        alignContent: "center",
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
})