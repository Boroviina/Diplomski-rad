import {Button, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Colors} from "../../constants/Colors";
import {FC} from "react";
import PhotoButton from "../ProbleemsScreenComponentns/UI/PhotoButton";
import {useNavigation} from "@react-navigation/native";

type props = {
    title: string | undefined;
    image: string | undefined;
    status: string | undefined;
}
const ProblemLog: FC<props> = ({title, image, status}) => {

    const navigation = useNavigation();

    function seeDetailsHandelr() {
        navigation.navigate('DetailsScreen' as never);
    }

    return <View style={styles.root}>
        <View style={styles.picContainer}>
            <Image src={image} style={styles.image}/>
        </View>
        <View style={styles.detailsContainer}>
            <Text style={[styles.title, {fontSize: 18, fontWeight: "bold"}]}>{title}</Text>
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>{status}</Text>
                <Pressable onPress={seeDetailsHandelr} style={styles.button}>
                    <View>
                        <Text style={{color: Colors.primary100}}>Vidi detalje</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    </View>
}

export default ProblemLog;

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
        marginHorizontal: 10,
        height: 140,
        borderStyle: "solid",
        borderColor: Colors.primary700,
        borderBottomWidth: 3,
        borderTopWidth: 1,
        borderRadius: 12,
        backgroundColor: Colors.primary100
    },
    picContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 2,
        height: '95%',
        padding: 4,

    },
    detailsContainer: {
        flex: 4,
        paddingHorizontal: 4,
        flexDirection: "column",
        justifyContent: "space-between",
        height: '95%',
        paddingVertical: 10
    },
    statusContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        color: Colors.primary700,
        fontSize: 16
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12
    },
    statusText: {
        color: Colors.primary700,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: Colors.primary700,
        padding: 5,
        borderRadius: 12,
        width: '50%',
        justifyContent: "center",
        alignItems: "center"
    }
})