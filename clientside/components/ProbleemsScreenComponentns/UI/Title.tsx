import {Text, View, StyleSheet} from "react-native";
import {ReactNode, FC} from "react";
import {Colors} from "../../../constants/Colors";

type props = {
    children: ReactNode
}

const Title: FC<props> = ({children}) => {
    return <View style={styles.container1}>
        <Text style={styles.text}>{children}</Text>
    </View>
}

export default Title;

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        marginTop: 20
    },
    text: {
        color: Colors.primary700,
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center"
    },
})