import {View, StyleSheet} from "react-native";
import {ReactNode, FC} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

type children = {
    children: ReactNode,
}
const Card: FC<children> = ({children}) => {
    return <View style={[styles.root]}>

        <View style={styles.card}>
            <KeyboardAwareScrollView>
                {children}
            </KeyboardAwareScrollView>
        </View>
    </View>
}

export default Card;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#0c87ef',
        paddingHorizontal: 32,
        paddingVertical: 16,
        justifyContent: "center",
        borderRadius: 12,
        marginTop:50
    },
    root: {
        flex: 1,
        padding: 24,
        backgroundColor: '#b7d6ef'
    },
})