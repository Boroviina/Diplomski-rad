import {View, StyleSheet} from "react-native";
import {ReactNode, FC} from "react";

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
    },
})
