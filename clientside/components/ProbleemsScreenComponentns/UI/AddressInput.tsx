import {StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "../../../constants/Colors";
import {FC, useState} from "react";

type props = {
    label: string;
    multiline?: boolean
    numberOfLines?: number
    scrollEnabled?: boolean
    onChangeText: (text: string) => void;
    minHeight?: number;
    value: string;
    must: boolean;
}

const AddressInput: FC<props> = ({label, must,minHeight, multiline, scrollEnabled, numberOfLines, onChangeText, value}) => {
    return <View style={styles.container}>
        <View style={styles.labelContainer}>
            <Text style={styles.text}>{label}</Text>
            {must && <Text style={styles.star}> *</Text>}
        </View>
        <TextInput style={[styles.textInput]}
                   onChangeText={onChangeText}
                   value={value}
                   multiline={multiline}
                   textAlignVertical={"top"}
                   numberOfLines={numberOfLines}
                   cursorColor={Colors.primary700}
                   scrollEnabled={scrollEnabled}
        />
    </View>
}

export default AddressInput;

const styles = StyleSheet.create({
    textInput: {
        flexGrow: 1,
        backgroundColor: Colors.primary100,
        borderWidth:1,
        borderColor: Colors.primary700,
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