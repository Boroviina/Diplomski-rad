import {Modal, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import {FC, useState} from "react";
import {Colors} from "../../constants/Colors";
import {updateUser} from "../../shared/services/user";
import {useAuth} from "../../shared/contexts/auth-context";

type props={
    onCloseDetailModal: (p:boolean)=>void;
    lastnameBefore: string;
    nameBefore: string;
}
const UpdateDetail:FC<props>=({onCloseDetailModal, lastnameBefore, nameBefore})=>{
    const [name, setName]=useState(nameBefore);
    const [lastaname, setLastname]=useState(lastnameBefore);

    const {currentUser} = useAuth();
    function onConfirm(){
        updateUser(currentUser?.id, {name: name, lastname: lastaname});
        ToastAndroid.show("Uspješna promjena", ToastAndroid.LONG);
        onCloseDetailModal(false);
    }
    return  <Modal transparent={true}>
            <TouchableOpacity onPress={onCloseDetailModal} style={styles.modalOpacity}>
                <View style={styles.changePasswordContainer}>

                        <Text style={styles.changePasswordText}>Promijeni ime</Text>
                        <TextInput style={styles.input}
                                   cursorColor={Colors.primary700}
                                   value={name}
                                   onChangeText={setName}
                        />
                        <Text style={styles.changePasswordText}>Promijeni prezime</Text>
                        <TextInput style={styles.input}
                                   cursorColor={Colors.primary700}
                                   value={lastaname}
                                   onChangeText={setLastname}
                        />
                </View>
                <Pressable style={styles.confirmButton} onPress={onConfirm}>
                    <Text style={styles.confirmButtonText}>Potvrdi</Text>
                </Pressable>
            </TouchableOpacity>
        </Modal>
}

export default UpdateDetail;

const styles=StyleSheet.create({
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
    changePasswordText:{
        color: Colors.primary700,
        fontSize: 18,
        flex:1
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
    confirmButton:{
        marginVertical:10,
        backgroundColor: Colors.primary700,
        padding: 15,
        width: 140,
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