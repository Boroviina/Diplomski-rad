import {Colors} from "../../constants/Colors";
import {Pressable, StyleSheet, Text} from "react-native";
import {FC} from "react";

type props = {
    logout: () => void
}
const LogoutButton:FC<props> = ({logout}) => {
    return <Pressable onPress={logout} style={styles.root}>
        <Text style={{color: Colors.primary100, fontWeight: 'bold'}}>Odjavi se</Text>
    </Pressable>
}
export default LogoutButton;

const styles=StyleSheet.create({
    root:{
        borderStyle: 'solid',
        borderColor: Colors.primary100,
        borderWidth: 1,
        padding: 8,
        borderRadius:16
    }
})