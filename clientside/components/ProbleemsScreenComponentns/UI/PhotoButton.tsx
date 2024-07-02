import {Pressable, Text, View, StyleSheet} from "react-native";
import {FC} from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Colors} from "../../../constants/Colors";

type props = {
    onPress: () => void,
    icon: string,
    label: string
}
const PhotoButton: FC<props> = ({onPress, icon, label}) => {
    return <Pressable onPress={onPress} style={styles.root}>
        <View style={styles.content}>
            <Ionicons name={icon} size={24} color={Colors.primary100}/>
            <Text style={styles.text}>{label}</Text>
        </View>
    </Pressable>
}

export default PhotoButton;

const styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.primary700,
        minHeight: 35,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        flex:1,
        marginHorizontal: 3
    },
    content: {
        flexDirection: "row",
        alignItems: "center"
    },
    text:{
        color: Colors.primary100,
        marginHorizontal: 10,
        fontSize: 18
    }
})

