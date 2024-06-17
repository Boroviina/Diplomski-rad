import {FC} from "react";
import {Alert, Pressable, StyleSheet, Text, View} from "react-native";
import {Colors} from "../../constants/Colors";
import {updateProblem} from "../../shared/services/problems.service";
import {ProblemStatus} from "../../shared/enums/problemStatus.enum";

type props = {
    title: string;
    changeHandler: ()=>void;
}
const StatusItem: FC<props> = ({title, changeHandler}) => {


    return <Pressable onPress={changeHandler} style={({pressed})=>[pressed && styles.pressed]}>
        <View style={styles.root}>
            <Text style={styles.text}>{title}</Text>
        </View>
    </Pressable>
}

export default StatusItem

const styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.primary100,
        width: '80%',
        flex: 1,
        marginVertical: 10,
        padding: 20,
        paddingHorizontal: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:16
    },
    text: {
        color: Colors.primary700
    },
    pressed:{
        backgroundColor: 'rgba(183,214,239, 0.7)'
    }
})