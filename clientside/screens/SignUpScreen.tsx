import {Alert, Pressable, ScrollView, ScrollViewBase, StyleSheet, Text, View} from "react-native";
import Card from "../components/startScreensComponents/Card";
import Input from "../components/startScreensComponents/Input";
import {useState} from "react";
import {useAuth} from "../shared/contexts/auth-context";
import {register} from "./helper/registerAxios";
import AuthService from "../shared/services/api-clients/auth.service";
import LoginButtons from "../components/startScreensComponents/LoginButtons";
import {Colors} from "../constants/Colors";


const authService = new AuthService();
const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastname, setLastname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {saveAuth, setCurrentUser} = useAuth();
    const [blockRefistration, setBlockRegistration] = useState(false);

    const parameterValidation = () => {
        const IsEmailValid = email.includes('@');
        const IsPasswordValid = password.length > 8 && password.match(/\d/) && password.match(/[a-zA-Z]/);
        const PasswordAreEqual = password === confirmPassword;
        if (!IsEmailValid) {
            Alert.alert('Greska pri unosu Email-a', "Zahtjevani format email-a name@example.com");
            return
        }
        if (!IsPasswordValid) {
            Alert.alert("Greska!", "Lozinka mora da sadrzi minimalno 8 karaktera, jedno slovo i jendnu cifru");
            return;
        }
        if (!PasswordAreEqual) {
            Alert.alert("Greska!", "Lozinke se ne poklapaju!");
            return;
        }
        setBlockRegistration(true);
    }

    const registrationHandler = async () => {
        parameterValidation();
        if (blockRefistration) {
            try {

                const response = await register(name, email, password, lastname);
                const authTokens = response.data.tokens;
                authService.saveToken(authTokens.access.token);
                saveAuth(authTokens);
                const user = await authService.getUser();
                console.log("Ovo je korisnik", user)
                setCurrentUser(user || undefined);
                Alert.alert('Uspješna registracija', "Dobili ste pristup podacima")
            } catch (error) {
                // console.error('Registration failed', error.message);
                // console.error('Registration failed', error.response);
                Alert.alert("Registration failed");
            }
        }
    }

    return <Card>
        <Text style={styles.text}>Registruj se</Text>
        <Input label={'Ime'} value={name} onChangeText={setName}/>
        <Input label={'Prezime'} value={lastname} onChangeText={setLastname}/>
        <Input label={'Email'} value={email} onChangeText={setEmail}/>
        <Input label={'Lozinka'} value={password} onChangeText={setPassword} secureTextEntry/>
        <Input label={'Potvrdi lozinku'} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry/>
        <LoginButtons onPress={() => registrationHandler()} children={"Registruj se"}/>
    </Card>
}

export default SignUpScreen;

const styles = StyleSheet.create({
    text: {
        color: 'white',
        textAlign: "center",
        fontSize: 24,
        marginBottom: 18,
        fontWeight: "bold"
    },
    root: {
        flex: 1,
    },
    error: {
        color: '#b60202',
        textAlign: "center"
    }
})