import {StyleSheet, Text, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {Colors} from "../../constants/Colors";
import {FC, useEffect, useState} from "react";
import {ProblemStatus} from "../../shared/enums/problemStatus.enum";

type props = {
    status: string | undefined;
    fontSize?: number;
    iconSize?: number;
}

function getEnumValueByKey(enumObj: any, key: string | undefined): string {
    return enumObj[key as keyof typeof enumObj] || key;
}

function getStatusIcon(status: string | undefined) {
    switch (status?.toLowerCase()) {
        case ProblemStatus.primljeno.toLowerCase():
            return {name: 'dot-circle', color: '#E49B0F'}
        case ProblemStatus.obradaUToku.toLowerCase().replace(/\s/g, ''):
            return {name: 'spinner', color: '#E49B0F'};
        case ProblemStatus.zavrseno.toLowerCase():
            return {name: 'check-circle', color: '#28A745'};
        case ProblemStatus.odbijeno.toLowerCase():
            return {name: 'times-circle', color: '#9b0e0e'}
    }
}

const Status: FC<props> = ({status, fontSize, iconSize}) => {
    const icon = getStatusIcon(status);

    useEffect(()=>{
        console.log(icon);
        console.log(ProblemStatus.obradaUToku)
    },[])


    return <View style={styles.root}>
        <Text style={[styles.text, {fontSize}]}>{getEnumValueByKey(ProblemStatus, status)}</Text>
        <FontAwesome6 name={icon?.name} size={iconSize} color={icon?.color}/>
    </View>
}

export default Status;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    text: {
        color: Colors.primary700,
        fontWeight: "bold",
        marginHorizontal: 5,
    }
})