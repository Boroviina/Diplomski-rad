import {Button, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "../../constants/Colors";
import {FC} from "react";
import SeeDetailsButton from "./SeeDetailsButton";

type props = {
    value: string,
    onChangeText: (text: string) => void
    onPress: () => void;
}

const FilterComponent: FC<props> = ({value, onChangeText, onPress}) => {
    return <View style={styles.root}>
        <TextInput style={styles.inputText}
                   cursorColor={Colors.primary700}
                   placeholder={"Unesite kod prijave za pretragu..."}
                   value={value}
                   onChangeText={onChangeText}
        />
        <View style={styles.buttonContainer}>
            <SeeDetailsButton onPress={onPress} label={"Pretraži"}/>
        </View>

    </View>
}

export default FilterComponent;

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 8,
        borderColor: Colors.primary400,
        borderWidth: 1,
        borderRadius: 12
    },
    inputText: {
        backgroundColor: Colors.primary200,
        flex: 4,
        height: '100%',
        marginRight: 5,
        color: Colors.primary700,
        padding: 5,
        borderRadius: 12,
        fontWeight: "bold",
        fontSize: 14
    },
    buttonContainer: {
        flex: 2,
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: Colors.primary700,
        padding: 5,
        borderRadius: 12,
        width: '50%',
        justifyContent: "center",
        alignItems: "center",
        flex: 2,
        height: '100%'
    }
})