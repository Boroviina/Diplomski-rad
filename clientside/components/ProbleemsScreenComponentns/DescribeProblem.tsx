import {TextInput, View, StyleSheet} from "react-native";
import Body from "./UI/Body";
import Title from "./UI/Title";
import InnerBody from "./UI/InnerBody";
import {FC, useEffect, useState} from "react";
import Description from "./UI/Description";
import {Colors} from "../../constants/Colors";
import LoginButtons from "../startScreensComponents/LoginButtons";
import ImagePicker from "./UI/ImagePicker";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useProblem} from "../../shared/contexts/problem-context";

type props = {
    onConfirm: (confirm: boolean) => void
    onBack: (confirm: boolean) => void
}

const DescribeProblem: FC<props> = ({onConfirm, onBack}) => {
    const {problem, setProblem} = useProblem();
    const [value, setValue] = useState(problem.description || '')
    const [photo, setPhoto] = useState<string[]>([])


    function nextHandler() {
        setProblem({...problem, description: value, uri: photo});
        onConfirm(true);
    }

    function backHandler() {
        onBack(true);
    }
    useEffect(()=>{

    })


    // @ts-ignore
    // @ts-ignore
    return <Body>
        <KeyboardAwareScrollView style={styles.scroll} contentContainerStyle={styles.contentContainerStyle}>
            <Title>Opišite ukratko Vaš problem</Title>
            <InnerBody>
                <TextInput autoCapitalize={"sentences"}
                           blurOnSubmit={true}
                           multiline={true}
                           onChangeText={setValue}
                           value={value}
                           style={styles.textInput}
                           scrollEnabled={true}
                           cursorColor={Colors.primary700}
                           numberOfLines={10}
                           textAlignVertical={"top"}
                           placeholder={"Konkretno opišite problem..."}
                />

            </InnerBody >
            <ImagePicker setPhoto={setPhoto}/>
            <View style={styles.buttonContainer}>
                <LoginButtons onPress={nextHandler} children={"Dalje"}/>
                <LoginButtons onPress={backHandler} children={"Nazad"}/>
            </View>
        </KeyboardAwareScrollView>
    </Body>

}


export default DescribeProblem;


const styles = StyleSheet.create({
    scroll: {
        width: '100%',
        height: '100%',
        flexDirection: "column",

    },
    contentContainerStyle: {
        flexDirection: "column",
        minHeight: '90%'
    },
    textInput: {
        backgroundColor: Colors.primary100,
        padding: 8,
        minHeight: 150,
        fontSize: 16
    },
    buttonContainer: {
        flex: 2,
        justifyContent: "center"
    }
})