import {StyleSheet, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const SplashScreen=()=>{
    return <View style={styles.root}>
        <FontAwesome6 name={'spinner'} size={30} color={'#E49B0F'}/>
    </View>
}
export default SplashScreen;

const styles=StyleSheet.create({
    root:{
        backgroundColor: 'rgba(255,255,255, 0.4)',
        justifyContent: "center",
        alignItems:"center",
        flex: 1,
        width: '100%',
        height: '100%'
    }
})