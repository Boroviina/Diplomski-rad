import {StyleSheet, Text, TextInput, View} from "react-native";

interface InputProps {
    label: string;
    value: string;
    onChangeText: (text: string)=>void;
    secureTextEntry?: boolean;
}

function Input(props: InputProps) {
    const {label,value, onChangeText, ...textInputProps} = props;
    return <View style={styles.root}>
        <Text style={styles.text}>{label}</Text>
        <TextInput style={styles.input} value={value} onChangeText={onChangeText} {...textInputProps}/>
    </View>
}

export default Input;

const styles=StyleSheet.create({
    root:{
        flexDirection: "column",
        marginVertical: 12
    },
    input:{
        backgroundColor: '#85c5f5',
        padding:4,
        minWidth:200,
        marginTop: 12,
        fontSize: 14,
        color: '#143859',
        borderRadius: 16
    },
    text:{
        color: 'white',
        fontSize: 16
    }
})