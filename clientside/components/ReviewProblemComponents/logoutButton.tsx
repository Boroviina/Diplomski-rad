import {Colors} from "../../constants/Colors";
import {Pressable, StyleSheet, Text} from "react-native";
import {FC} from "react";

type props = {
    action: () => void
    label: String
}
const LogoutButton:FC<props> = ({action, label}) => {
    return <Pressable onPress={action} style={styles.root}>
        <Text style={{color: Colors.primary100, fontWeight: 'bold'}}>{label}</Text>
    </Pressable>
}
export default LogoutButton;

const styles=StyleSheet.create({
    root:{
        borderStyle: 'solid',
        borderColor: Colors.primary100,
        borderWidth: 1,
        padding: 8,
        borderRadius:16,
        marginHorizontal:2
    }
})