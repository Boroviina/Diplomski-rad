import {View, StyleSheet, Text} from "react-native";
import {Colors} from "../constants/Colors";
import ChooseOption from "../components/ProbleemsScreenComponentns/ChooseOption";
import {useEffect, useState} from "react";
import DescribeProblem from "../components/ProbleemsScreenComponentns/DescribeProblem";
import AddAddress from "../components/ProbleemsScreenComponentns/AddAddress";
import Contact from "../components/ProbleemsScreenComponentns/Contact";
import Confirmation from "../components/ProbleemsScreenComponentns/Confirmation";
import {ProblemProvider} from '../shared/contexts/problem-context';

const ReportProblemScreen = () => {
    const [currentStep, setCurrentStep]=useState(1);
    const goToNextStep=()=>{
        setCurrentStep(prevStep=>prevStep+1);
    }
    const goToPreviousStep=()=>{
        setCurrentStep(prevStep=>prevStep-1);
    }


    let card;
    switch (currentStep){
        case 1: card = <ChooseOption onConfirm={goToNextStep}/>
            break;
        case 2: card = <AddAddress onConfirm={goToNextStep} onBack={goToPreviousStep}/>
            break;
        case 3: card = <DescribeProblem onConfirm={goToNextStep} onBack={goToPreviousStep}/>
            break;
        case 4: card = <Contact onConfirm={goToNextStep} onBack={goToPreviousStep}/>
            break;
        case 5: card = <Confirmation onBack={goToPreviousStep}/>
    }

    return <View style={styles.root}>
        <ProblemProvider>
            {card}
        </ProblemProvider>
    </View>
}

export default ReportProblemScreen;

const styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.primary50,
        flex: 1,
        height: '100%'
    },


})

