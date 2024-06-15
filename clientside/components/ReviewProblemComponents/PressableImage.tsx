import {Image, StyleSheet, Pressable, View} from "react-native";
import {FC} from "react";

type props = {
    uri: string;
    onPress: (uri: string) => void;
}

const PressableImage: FC<props> = ({uri, onPress}) => {
    return <Pressable style={styles.pressable} onPress={() => onPress(uri)}>
        <View style={styles.imagePreview}>
            <Image source={{uri}} style={styles.image}/>
        </View>
    </Pressable>
}

export default PressableImage;

const styles = StyleSheet.create({
    pressable: {
        width: '21%',
        height: '100%',
        marginHorizontal: 5,
        marginVertical: 2,
        justifyContent: "center",
        alignItems: "center",
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
})