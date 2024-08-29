import {Text, TextInput, Modal, TouchableOpacity, View, StyleSheet, Pressable, ToastAndroid} from "react-native";
import {Colors} from "../../constants/Colors";
import {FC, useState} from "react";
import {deleteUser, validatePassword} from "../../shared/services/user";
import {useAuth} from "../../shared/contexts/auth-context";

type props={
    onClose: ()=>void;
}
const AccountDeactivation: FC<props>=({onClose})=>{
    const [password, setPassword]=useState('');
    const {currentUser, logout}=useAuth();
    function onConfirm(){
        // validatePassword(currentUser?.id, password).then(isValid=>{
        //     console.log(isValid);
        //     if (isValid){
        //
        //         deleteUser(currentUser?.id);
                logout();
                ToastAndroid.show("Nalog deaktiviran", ToastAndroid.LONG);
            // }else{
            //     ToastAndroid.show("Pogresna lozinka", ToastAndroid.LONG);
            // }
    // })
    }
    return <Modal transparent={true}>
        <TouchableOpacity onPress={onClose} style={styles.modalOpacity}>
        <View style={styles.changePasswordContainer}>
        <Text style={styles.changePasswordText}>Unesite lozinku da biste deaktivirali nalog</Text>
        <TextInput style={styles.input}
                   cursorColor={Colors.primary700}
                   secureTextEntry={true}
                   value={password}
                   onChangeText={setPassword}
        />
        </View>
            <Pressable style={styles.confirmButton} onPress={onConfirm}>
                <Text style={styles.confirmButtonText}>Deaktiviraj</Text>
            </Pressable>
        </TouchableOpacity>
    </Modal>

}

export default AccountDeactivation;

const styles= StyleSheet.create({
    changePasswordText:{
        color: Colors.primary700,
        fontSize: 18,
        flex:1,
        textAlign:"center"
    },
    input:{
        backgroundColor: Colors.primary100,
        marginVertical:5,
        flex: 1,
        width: 200,
        paddingHorizontal: 12,
        borderRadius: 12,
        color: Colors.primary700,
        textAlign: "center",
        fontSize: 18
    },
    modalOpacity:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    changePasswordContainer:{
        justifyContent:"center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.primary700,
        padding: 30,
        borderRadius:12,
        backgroundColor: 'rgba(255,255,255,0.9)',
        maxHeight: 200
    },
    confirmButton:{
        marginVertical:10,
        backgroundColor: '#e70707',
        padding: 15,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12
    },
    confirmButtonText:{
        color: 'white',
        fontWeight: "bold",
        fontSize: 18
    }
})