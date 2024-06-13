import {Pressable, Text, View, StyleSheet} from "react-native";
import {FC, ReactNode} from "react";
import {Colors} from "../../constants/Colors";

type Children = {
    children: ReactNode;
    onPress: () => void;
}

const LoginButtons: FC<Children> = ({children, onPress}) => {
    return <Pressable style={[styles.root]} onPress={onPress}>
        <View>
            <Text style={styles.text}>{children}</Text>
        </View>
    </Pressable>
}

export default LoginButtons;

const styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.primary700,
        minHeight: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginVertical: 10
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold"
    }
})