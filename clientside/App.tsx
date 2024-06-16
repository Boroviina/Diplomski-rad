import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
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

const Stack = createNativeStackNavigator<RootStackParamsList>();


function AuthentificationScreens() {
    const {auth} = useAuth();


    return (<Stack.Navigator>
            {auth ? <>
                <Stack.Screen name={'Revision'} component={Reviosion} options={{
                    title: "Pristigle prijave",
                    headerStyle: {backgroundColor: Colors.primary700},
                    headerTintColor: Colors.primary100
                }}/>
                <Stack.Screen name={'AuthDetailScreen'} component={AuthDetailScreen} options={{
                    title: "Detalji prijave",
                    headerStyle: {backgroundColor: Colors.primary700},
                    headerTintColor: Colors.primary100
                }}/>
            </> : <>
                <Stack.Screen name='StartScreen' component={StartScreen}/>
                <Stack.Screen name='Login' component={LoginScreen}/>
                <Stack.Screen name='SignUp' component={SignUpScreen}/>
                <Stack.Screen name={'ReportProblem'} component={ReportProblemScreen} options={{
                    title: "Prijavi problem",
                    headerBackVisible: false,
                    headerStyle: {backgroundColor: Colors.primary700},
                    headerTintColor: Colors.primary100
                }
                }/>
                <Stack.Screen name={'ReviewProblems'} component={ReviewScreen} options={{
                    title: "Pregled prijava",
                    headerStyle: {backgroundColor: Colors.primary700},
                    headerTintColor: Colors.primary100
                }}
                />
                <Stack.Screen name={'DetailsScreen'} component={DetailsScreen} options={{
                    title: "Detalji prijave",
                    headerStyle: {backgroundColor: Colors.primary700},
                    headerTintColor: Colors.primary100
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
