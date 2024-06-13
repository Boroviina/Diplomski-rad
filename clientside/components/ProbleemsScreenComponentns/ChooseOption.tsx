import Title from "./UI/Title";
import InnerBody from "./UI/InnerBody";
import RNPickerSelect from "react-native-picker-select";
import Description from "./UI/Description";
import {View, StyleSheet} from "react-native";
import LoginButtons from "../startScreensComponents/LoginButtons";
import Body from "./UI/Body";
import {Colors} from "../../constants/Colors";
import {FC, useEffect, useState} from "react";
import {ProblemType} from "../../shared/enums/problemType.enum";
import {useProblem} from "../../shared/contexts/problem-context";

type props = {
    onConfirm: (confirmed: boolean) => void
}
const problemTypeOptions = Object.values(ProblemType).map((value, label) => ({
    label: value,
    value: Object.keys(ProblemType).find(key => ProblemType[key as keyof typeof ProblemType] === value)
}))

const ChooseOption: FC<props> = ({onConfirm}) => {
    const {problem, setProblem} = useProblem();
    const [selectedItem, setSelectedItem] = useState<ProblemType | undefined>(problem.problemType || undefined);
    const nextHandler = () => {
        setProblem({...problem, problemType: selectedItem})
        onConfirm(true);
    }

    return <Body>
        <Title>Odaberite opciju koja kategoriše Vaš problem</Title>
        <InnerBody>
            <RNPickerSelect onValueChange={(value) => setSelectedItem(value)} items={problemTypeOptions}
                            style={pickerStyle} value={selectedItem}
            />
            <Description>Odaberite opciju koja kategoriše Vaš problem zatim pritisnite opciju "Dalje"</Description>
        </InnerBody>
        <View style={styles.buttonContainer}>
            <LoginButtons onPress={nextHandler} children={"Dalje"}/>
        </View>
    </Body>
}

export default ChooseOption;

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 2,
        justifyContent: "center"
    }
})

const pickerStyle = StyleSheet.create({
    inputIOS: {},
    inputAndroid: {
        fontWeight: "bold",
        backgroundColor: Colors.primary700,
        color: 'white',
        paddingVertical: 16,
        marginTop: 40,
        fontSize: 24,
        borderRadius: 12
    }
})