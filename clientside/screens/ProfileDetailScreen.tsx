import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../types/types";
import {FC, useCallback, useState} from "react";
import {
    Modal,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    ImageBackground
} from "react-native";
import {useAuth} from "../shared/contexts/auth-context";
import card from "../components/startScreensComponents/Card";
import {Colors} from "../constants/Colors";
import ChangePassword from "../components/profileDetail/ChangePassword";
import UpdateDetail from "../components/profileDetail/UpdateDetail";
import {getProblems} from "../shared/services/problems.service";
import {getUser} from "../shared/services/user";
import {ProblemModel} from "../shared/models/problems.model";
import AccountDeactivation from "../components/profileDetail/AccountDeactivation";

type ProfileDetailScreenProps = NativeStackScreenProps<RootStackParamsList, 'ProfileDetailScreen'>

const ProfilDetailScreen : FC<ProfileDetailScreenProps>=()=>{
    const {currentUser}=useAuth()
    const [changePasswordModal, setChangePasswordModal]=useState(false);
    const [changeDetailModal, setChangeDetailModal]=useState(false);
    const [deactivationModal, setDeactivationModal]=useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [user, setUser] = useState<ProblemModel[] | undefined>();
    function changePassword (){
        setChangePasswordModal(true);
    }
    function closeModal(){
        setChangePasswordModal(false)
    }
    function changeDetail (){
        setChangeDetailModal(true);
    }
    function closeDetailModal(){
        setChangeDetailModal(false)
    }
    function deactivate (){
        setDeactivationModal(true);
    }
    function closeDeactivateModal(){
        setDeactivationModal(false)
    }
    const fetchData = async () => {
        const user = await getUser(currentUser?.id);
        // console.log("Ovo su podaci ", data);
        setUser(user);
    }
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, []);
    return <ImageBackground
    source={require('../assets/backgroundPic.jpg')}
    style={styles.background}
    >
    <View style={styles.root}>
        <ScrollView style={styles.scrollContainer}
                    contentContainerStyle={styles.listContainer}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        >
        <Text style={styles.title}>Uredi profil</Text>
        <View style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.textLabel}>Ime i prezime</Text>
                <Text style={styles.dataLabel}>{currentUser?.name+" "+currentUser?.lastname}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textLabel}>E-mail</Text>
                <Text style={styles.dataLabel}>{currentUser?.email}</Text>
            </View>
            <Pressable style={styles.changePassword} onPress={changePassword}>
                <Text style={styles.changePasswordText}>Promijeni lozinku</Text>
            </Pressable>
            <Pressable style={styles.changePassword} onPress={changeDetail}>
                <Text style={styles.changePasswordText}>Izmijeni detalje</Text>
            </Pressable>
            <Pressable style={styles.changePassword} onPress={deactivate}>
                <Text style={{color: '#c20909'}}>Deaktiviraj nalog</Text>
            </Pressable>
        </View>
        </ScrollView>
        {changePasswordModal && <ChangePassword onClose={closeModal}/>}
        {deactivationModal && <AccountDeactivation onClose={closeDeactivateModal}/>}
        {changeDetailModal && <UpdateDetail onCloseDetailModal={closeDetailModal} lastnameBefore={currentUser?.lastname} nameBefore={currentUser?.name}/>}
    </View>
    </ImageBackground>
}

export default ProfilDetailScreen;

const styles=StyleSheet.create({
    background:{
        flex:1
    },
    root:{
        flex:1,
        padding: 15,
        backgroundColor: 'rgba(255,255,255,0.6)'
    },
    title:{
       color: Colors.primary700,
        fontSize: 24,
        fontWeight: "bold",
        marginVertical:40,
        textAlign:"center"
    },
    card:{
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 12,
        borderColor: Colors.primary700,
        backgroundColor: 'rgba(255,255,255,0.6)',
        padding: 10,

        minHeight:500,
        minWidth:300
    },

    textContainer:{
        flex:1,
        justifyContent:"center",
        padding: 20
    },
    textLabel:{
        fontSize: 20,
        color: Colors.primary700,
        marginBottom:10
    },
    dataLabel:{
        flex:1,
        fontSize: 22,
        color: Colors.primary700,
        fontWeight: "bold"
    },
    changePassword:{
        flex:1,
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 12,
        padding:1,
        marginVertical: 5,
        borderColor: Colors.primary700,
        borderWidth:1
    },
    changePasswordText:{
        color: Colors.primary700,
        fontWeight: "bold"
    },
    scrollContainer: {
        paddingBottom: 20,
        borderRadius: 16
    },
    listContainer: {
        flexGrow: 1,
    },
})