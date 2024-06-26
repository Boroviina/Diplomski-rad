import {Button, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Colors} from "../../constants/Colors";
import {FC} from "react";
import PhotoButton from "../ProbleemsScreenComponentns/UI/PhotoButton";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../../types/types";
import Status from "./Status";
import SeeDetailsButton from "./SeeDetailsButton";
import {useAuth} from "../../shared/contexts/auth-context";

type props = {
    title: string | undefined;
    image: string | undefined;
    status: string | undefined;
    id: string | undefined;
}
const ProblemLog: FC<props> = ({title, image, status, id}) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
    const {auth}=useAuth();

    function seeDetailsHandelr() {
        if (auth){
            navigation.navigate('AuthDetailScreen', {
                detailId: id
            })
        }else {
            navigation.navigate('DetailsScreen',{
                detailId: id
            });
        }

    }

    return <View style={styles.root}>
        <View style={styles.picContainer}>
            <Image src={image} style={styles.image}/>
        </View>
        <View style={styles.detailsContainer}>
            <Text style={[styles.title, {fontSize: 17, fontWeight: "bold"}]}>{title}</Text>
            <Status status={status} fontSize={16} iconSize={16}/>
            <View style={styles.statusContainer}>
                <View style={{width:'50%'}}>
                    <SeeDetailsButton onPress={seeDetailsHandelr} label={'Vidi detalje'}/>
                </View>
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
        height: 165,
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
        paddingVertical: 10
    },
    statusContainer: {
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        flex:2,
        padding: 2,
    },
    title: {
        color: Colors.primary700,
        fontSize: 14,
        padding:4,
        flex:2,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12
    },

})