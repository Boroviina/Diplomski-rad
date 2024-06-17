import {StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "../../../constants/Colors";
import {FC, useState} from "react";

type props = {
    label: string;
    multiline?: boolean
    numberOfLines?: number
    onChangeText: (text: string) => void;
    value: string;
    must: boolean;
}

const AddressInput: FC<props> = ({label, must, multiline, numberOfLines, onChangeText, value}) => {
    return <View style={styles.container}>
        <View style={styles.labelContainer}>
            <Text style={styles.text}>{label}</Text>
            {must && <Text style={styles.star}> *</Text>}
        </View>
        <TextInput style={styles.textInput}
                   onChangeText={onChangeText}
                   value={value}
                   multiline={multiline}
                   numberOfLines={numberOfLines}
                   textAlignVertical={"top"}
                   cursorColor={Colors.primary700}
        />
    </View>
}

export default AddressInput;

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: Colors.primary200,
        borderRadius: 16,
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: Colors.primary700
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
    star: {
        color: '#a11111',
        fontWeight: "bold",
        fontSize: 18
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
})