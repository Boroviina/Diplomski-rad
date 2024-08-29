import {StatusBar} from 'expo-status-bar';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";

import LoginScreen from './screens/LoginScreen';
import StartScreen from "./screens/StartScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ReportProblemScreen from "./screens/ReportProblemScreen";
import Reviosion from "./screens/Reviosion";
import {AuthInit, AuthProvider, useAuth} from "./shared/contexts/auth-context";
import {RootStackParamsList} from "./types/types";
import ReviewScreen from "./screens/ReviewScreen";
import {Colors} from "./constants/Colors";
import DetailsScreen from "./screens/DetailsScreen";
import AuthDetailScreen from "./screens/AuthDetailScreen";
import LogoutButton from "./components/ReviewProblemComponents/logoutButton";
import EntryScreen from "./screens/EntryScreen";
import ProfilDetailScreen from "./screens/ProfileDetailScreen";

const Stack = createNativeStackNavigator<RootStackParamsList>();


function AuthentificationScreens() {
    const {auth, logout, currentUser} = useAuth();


    return (<Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: Colors.primary700},
            headerTintColor: Colors.primary100
        }}>
            {auth ? <>
                <Stack.Screen name={'Revision'} component={Reviosion} options={({navigation})=>({
                    title: "Pristigle prijave",
                    headerRight: () => (
                        <>
                            <LogoutButton action={logout} label={"Odjavi se"}/>
                            <LogoutButton action={()=>navigation.navigate('ProfileDetailScreen')} label={currentUser?.name+" "+currentUser?.lastname}/>
                        </>

                    )
                })}/>
                <Stack.Screen name={'AuthDetailScreen'} component={AuthDetailScreen} options={{
                    title: "Detalji prijave",
                }}/>
                <Stack.Screen name={'ProfileDetailScreen'} component={ProfilDetailScreen} options={{
                    title: currentUser?.name+' '+currentUser?.lastname,
                }}/>
            </> : <>
                <Stack.Screen name={'EntryScreen'} component={EntryScreen} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name='StartScreen' component={StartScreen} options={{
                    title: ''
                }}/>
                <Stack.Screen name='Login' component={LoginScreen} options={{
                    title: 'Prijavi se'
                }}/>
                <Stack.Screen name='SignUp' component={SignUpScreen} options={{
                    title: 'Registruj se'
                }}/>
                <Stack.Screen name={'ReportProblem'} component={ReportProblemScreen} options={{
                    title: "Prijavi problem",
                    headerBackVisible: false,
                }
                }/>
                <Stack.Screen name={'ReviewProblems'} component={ReviewScreen} options={{
                    title: "Pregled prijava",
                }}
                />
                <Stack.Screen name={'DetailsScreen'} component={DetailsScreen} options={{
                    title: "Detalji prijave",
                }}/>
            </>}
        </Stack.Navigator>
    )
}


export default function App() {
    return (
        <AuthProvider>
            <AuthInit>
                <NavigationContainer>
                    <AuthentificationScreens/>
                </NavigationContainer>
            </AuthInit>
        </AuthProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
