import {View, StyleSheet} from "react-native";
import {ReactNode, FC} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
type props={
    children: ReactNode
}
const Body: FC<props>=({children})=>{
    return <View style={styles.container}>
        {children}
    </View>
}

export default Body;

const styles=StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        padding:18,
    },
})
