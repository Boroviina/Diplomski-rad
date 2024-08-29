import {TextInput, View, Text, StyleSheet, Pressable, Alert} from "react-native";
import Input from "../components/startScreensComponents/Input";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import AuthService from "../shared/services/api-clients/auth.service";
import {useAuth} from "../shared/contexts/auth-context";
import {useState} from "react";
import Card from '../components/startScreensComponents/Card';
import {Colors} from "../constants/Colors";
import LoginButtons from "../components/startScreensComponents/LoginButtons";

const authService = new AuthService();

function LoginScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const {saveAuth, setCurrentUser} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginHandler = async (email: string, password: string) => {
        try {
            const response = await authService.login(email, password);
            if (response && response.tokens.access.token) {
                saveAuth(response.tokens);
                setCurrentUser(response.user);
                navigation.navigate('Revision');
            } else {
                Alert.alert('Niste se prijavili', 'Provjerite email ili lozinku!');
            }
        } catch (error) {

            console.log('Login failed', error);
            Alert.alert('Login failed', "An error occurred. Please try again.");
        }
    }

    function SignUpHandler() {
        navigation.navigate('SignUp');
    }

    return <Card>
        <Text style={styles.text}>Prijavi se</Text>
        <Input label={'E-mail'} value={email} onChangeText={setEmail}/>
        <Input label={'Password'} value={password} onChangeText={setPassword} secureTextEntry/>
        <LoginButtons onPress={() => loginHandler(email, password)} children={"Prijavi se"}/>
        <View style={styles.textContainer}>
            <Text style={styles.textOne}>ili</Text>
        </View>
        <LoginButtons onPress={SignUpHandler} children={"Registruj se"}/>
    </Card>
}

export default LoginScreen;

const styles = StyleSheet.create({

    text: {
        color: Colors.primary700,
        textAlign: "center",
        fontSize: 24,
        marginBottom: 18,
        fontWeight: "bold"
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    textOne: {
        color: Colors.primary700,
        fontSize: 15,
        marginVertical: 10,
        fontWeight: "bold"
    },
    loginButtonStyle: {
        backgroundColor: Colors.primary700
    }
})