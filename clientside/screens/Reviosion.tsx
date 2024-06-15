import {StyleSheet, View} from "react-native";
import {Colors} from "../constants/Colors";
import RewiewComponent from "../components/ReviewProblemComponents/RewiewComponent";

const Reviosion=()=>{
    return <RewiewComponent/>
}

export default Reviosion;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.primary50,
    },
})