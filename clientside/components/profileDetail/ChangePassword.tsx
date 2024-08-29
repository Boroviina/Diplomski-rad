import {Modal, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import {Colors} from "../../constants/Colors";
import {FC, useState} from "react";
import {useAuth} from "../../shared/contexts/auth-context";
import {updateUser, validatePassword} from "../../shared/services/user";

type props ={
    onClose: ()=>void
}
const ChangePassword:FC<props>=({ onClose})=>{
    const {currentUser}=useAuth();
    const [password, setPassword]=useState('');
    const [newPassword, setNewPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState('');
    const [openNewPasswordModal, setOpenNewPasswordModal]=useState(false);
    function onConfirm (){
        if (!openNewPasswordModal){
            validatePassword(currentUser?.id, password).then(isValid=>{
                if (isValid){
                    ToastAndroid.show("Pogrešan unos", ToastAndroid.LONG);
                }else{
                    setOpenNewPasswordModal(true);
                    setPassword('');
                }
            })

        }else{
            if (newPassword === confirmPassword){
                updateUser(currentUser?.id,{password: newPassword});
                ToastAndroid.show("Uspješna promjena", ToastAndroid.LONG);
                setOpenNewPasswordModal(false);
                onClose(false);
            }else {
                ToastAndroid.show("Lozinke se ne poklapaju", ToastAndroid.LONG);
            }
        }

    }

    return <Modal transparent={true}>
        <TouchableOpacity onPress={onClose} style={styles.modalOpacity}>
            <View style={styles.changePasswordContainer}>
                {!openNewPasswordModal ? <>
                    <Text style={styles.changePasswordText}>Unesite prethodnu lozinku</Text>
                    <TextInput style={styles.input}
                               cursorColor={Colors.primary700}
                               secureTextEntry={true}
                               value={password}
                               onChangeText={setPassword}
                    />
                </>:<>
                    <Text style={styles.changePasswordText}>Unesite novu lozinku</Text>
                    <TextInput style={styles.input}
                               cursorColor={Colors.primary700}
                               secureTextEntry={true}
                               value={newPassword}
                               onChangeText={setNewPassword}
                    />
                    <Text style={styles.changePasswordText}>Potvrdite novu lozinku</Text>
                    <TextInput style={styles.input}
                               cursorColor={Colors.primary700}
                               secureTextEntry={true}
                               value={confirmPassword}
                               onChangeText={setConfirmPassword}
                    />
                    </>
                }
            </View>
            <Pressable style={styles.confirmButton} onPress={onConfirm}>
                <Text style={styles.confirmButtonText}>Potvrdi</Text>
            </Pressable>
        </TouchableOpacity>
    </Modal>
}

export default ChangePassword

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
        maxHeight: 200,

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