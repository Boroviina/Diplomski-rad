import {Pressable, StyleSheet, Text, View} from "react-native";
import {Colors} from "../../constants/Colors";
import {FC} from "react";
type props={
    onPress: ()=>void;
    label: string
}
const SeeDetailsButton:FC<props> =({onPress, label})=>{
    return <Pressable onPress={onPress} style={styles.button}>
        <View>
            <Text style={styles.text}>{label}</Text>
        </View>
    </Pressable>
}
export default SeeDetailsButton;


const styles=StyleSheet.create({
    button: {
        backgroundColor: Colors.primary700,
        padding: 5,
        borderRadius: 12,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        flex:1,
    },
    text:{
        color: Colors.primary100,
        fontWeight: "bold"
    }
})