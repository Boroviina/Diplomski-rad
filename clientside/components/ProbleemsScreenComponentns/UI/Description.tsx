import {Text, View, StyleSheet} from "react-native";
import {ReactNode, FC} from "react";
import {Colors} from "../../../constants/Colors";

type props = {
    children: ReactNode
}
const Description: FC<props>=({children})=>{
    return   <View style={styles.textContainer}>
        <Text style={styles.text1}>{children}</Text>
    </View>
}

export default Description;

const styles=StyleSheet.create({
    textContainer: {
        flex: 1,
        marginTop: 40
    },
    text1: {
        color: Colors.primary700,
        textAlign: "center",
        fontSize: 16,
    },
})

