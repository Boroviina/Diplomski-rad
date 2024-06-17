import {FC, useEffect, useState} from "react";
import {FlatList, Modal, Text, TouchableOpacity} from "react-native";
import {ProblemModel} from "../../shared/models/problems.model";
import {getProblem, updateProblem} from "../../shared/services/problems.service";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Status from "./Status";
import SentDetails from "./SentDetails";
import Answer from "./Answer";
import {Alert, StyleSheet, View, Pressable} from "react-native";
import {Colors} from "../../constants/Colors";
import {useAuth} from "../../shared/contexts/auth-context";
import AuthAnswer from "./AuthAnswer";
import {ProblemStatus} from "../../shared/enums/problemStatus.enum";
import StatusItem from "./StatusItem";

type props = {
    detailId: string;
}
const problemStatusData = Object.keys(ProblemStatus).map(key => ({
    id: key,
    title: ProblemStatus[key as keyof typeof ProblemStatus]
}))
const DetailComponent: FC<props> = ({detailId}) => {
    const [details, setDetails] = useState<ProblemModel | undefined>();
    const [openModal, setOpenModal] = useState(false);
    const {auth} = useAuth();


    useEffect(() => {
        const fetchData = async () => {
            const data = await getProblem(detailId);
            setDetails(data);
        }
        fetchData();
    }, [])

    function openModalHandler() {
        setOpenModal(true);
        console.log(problemStatusData)
    }

    function changeHandler(status: string) {
        Alert.alert(
            'Promijeni status',
            `Da li želite da promijenite status u ${status}?`,
            [{
                text: "Ne",
                style: "cancel"
            },
                {
                    text: 'Da',
                    onPress: async () => {
                        const updatedProblem = new ProblemModel({...details, status: status as ProblemStatus})
                        await updateProblem(detailId, {status: status as ProblemStatus});
                        setDetails(updatedProblem);
                        setOpenModal(false);
                    }
                }]
        )
    }

    return <View style={styles.root}>
        <KeyboardAwareScrollView style={styles.scroll} contentContainerStyle={styles.contentContainerStyle}>
            {auth ? <Pressable onPress={openModalHandler}>
                <Status status={details?.status} iconSize={20} fontSize={18}/>
            </Pressable> : <Status status={details?.status} iconSize={20} fontSize={18}/>}

            <SentDetails details={details}/>

            {auth ? <AuthAnswer  answer={details?.answer} detailId={detailId}/> : <Answer answer={details?.answer}
                                                                                         searchKey={details?.searchId}
                                                                                         detailId={detailId}/>
            }
            {openModal && <Modal transparent={true}>
                <TouchableOpacity style={styles.modalContainer} onPress={() => setOpenModal(false)}>
                    <FlatList data={problemStatusData}
                              renderItem={({item}) => <StatusItem title={item.title}
                                                                  changeHandler={() => changeHandler(item.id)}/>}
                              keyExtractor={item => item.id}
                              style={styles.flatListContainer}
                    />

                </TouchableOpacity>
            </Modal>}
        </KeyboardAwareScrollView>
    </View>
}

export default DetailComponent;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.primary50,
        padding: 20,
        paddingVertical: 30,
        flexDirection: "column"
    },
    scroll: {
        width: '100%',
        height: '100%',
        flexDirection: "column",

    },
    contentContainerStyle: {
        flexDirection: "column",
        minHeight: '70%'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        paddingVertical: 180
    },
    flatListContainer: {
        paddingVertical: 50,
        backgroundColor: 'white',
        width: 300,
        paddingLeft: 50
    },
    pressed:{
        backgroundColor: 'rgba(183,214,239, 0.7)'
    }


})