import {StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "../../constants/Colors";

interface InputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
}

function Input(props: InputProps) {
    const {label, value, onChangeText, ...textInputProps} = props;
    return <View style={styles.root}>
        <Text style={styles.text}>{label}</Text>
        <TextInput style={styles.input}
                   value={value}
                   onChangeText={onChangeText}
                   cursorColor={Colors.primary700}
                   {...textInputProps}

        />
    </View>
}

export default Input;

const styles = StyleSheet.create({
    root: {
        flexDirection: "column",
        marginVertical: 12
    },
    input: {
        backgroundColor: '#85c5f5',
        borderWidth:1,
        borderColor: Colors.primary700,
        padding: 8,
        minWidth: 200,
        marginTop: 12,
        fontSize: 16,
        color: Colors.primary700,
        borderRadius: 16,
        fontWeight: "bold"
    },
    text: {
        color: Colors.primary700,
        fontSize: 16
    }
})