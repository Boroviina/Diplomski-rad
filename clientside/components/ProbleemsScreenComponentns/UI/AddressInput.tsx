import {StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "../../../constants/Colors";
import {FC, useState} from "react";

type props={
    label: string;
    multiline?: boolean
    numberOfLines?: number
    onChangeText: (text: string) => void;
    value: string;
}

const AddressInput: FC<props>=({label, multiline, numberOfLines, onChangeText, value})=>{
    return <View style={styles.container}>
        <Text>{label}</Text>
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

const styles=StyleSheet.create({
    textInput:{
        backgroundColor: Colors.primary100,
        marginVertical: 5,
        paddingHorizontal:10,
        paddingVertical:8,
        color: Colors.primary700
    },
    container:{
        flexDirection: "column",
        padding: 20,
        flex:1
    }
})