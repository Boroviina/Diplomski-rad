import {Pressable, StyleSheet, Text} from "react-native";
import {FC} from "react";
import {Colors} from "../../constants/Colors";

type props = {
    onPress: () => void
}

const FilterCloseButton: FC<props> = ({onPress}) => {
    return <Pressable onPress={onPress} style={styles.root}>
        <Text style={styles.text}>X</Text>
    </Pressable>
}

export default FilterCloseButton;

const styles = StyleSheet.create({
    root: {
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        padding: 4,
        borderRadius: 12,
        borderColor: Colors.primary700,
        borderWidth: 1
    },
    text: {
        textAlign: "center",
        color: Colors.primary700
    }
})