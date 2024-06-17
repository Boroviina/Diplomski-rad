import {View, StyleSheet} from "react-native";
import {ReactNode, FC} from "react";
import {Colors} from "../../../constants/Colors";

type props = {
    children: ReactNode
}
const InnerBody: FC<props> = ({children}) => {
    return <View style={styles.container}>
        {children}
    </View>
}

export default InnerBody;

const styles = StyleSheet.create({
    container: {
        flex:2,
        borderStyle:"solid",
        borderWidth: 1,
        borderColor: Colors.primary700,
        padding:5,
        borderRadius:16
    },
})
