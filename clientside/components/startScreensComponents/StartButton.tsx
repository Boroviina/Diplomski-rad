import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "../../constants/Colors";
import React from "react";

interface StartButtonProps {
    onPress: () => void;
    text: string
}

const StartButton: React.FC<StartButtonProps> = ({onPress, text}) => {
    return <Pressable
        style={({pressed}) => [styles.root, pressed && styles.pressed]}
        onPress={onPress}
    >
        <View>
            <Text style={styles.text}>{text}</Text>
        </View>
    </Pressable>
}

export default StartButton;

const styles = StyleSheet.create({
    root: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: Colors.primary400,
        minWidth: 300,
        minHeight: 80,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        elevation: 20
    },
    pressed: {
        opacity: 0.75
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    }
})