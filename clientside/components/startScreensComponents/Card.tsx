import {View, StyleSheet, ImageBackground} from "react-native";
import {ReactNode, FC} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

type children = {
    children: ReactNode,
}
const Card: FC<children> = ({children}) => {
    return <ImageBackground
        source={require('../../assets/backgroundPic.jpg')}
        style={styles.background}
    >
    <View style={[styles.root]}>

        <View style={styles.card}>
            <KeyboardAwareScrollView>
                {children}
            </KeyboardAwareScrollView>
        </View>
    </View>
    </ImageBackground>
}

export default Card;

const styles = StyleSheet.create({
    background:{
        flex: 1
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        paddingHorizontal: 32,
        paddingVertical: 16,
        justifyContent: "center",
        borderRadius: 12,
        marginTop:50
    },
    root: {
        flex: 1,
        padding: 24,
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
})