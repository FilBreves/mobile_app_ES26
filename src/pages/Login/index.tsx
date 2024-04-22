import { StatusBar } from 'expo-status-bar';
import { authService } from '../../services/auth.service';
import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import styles from './styles';
import React from 'react';
import { MyInput } from '../../components/MyInput';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Exception } from 'handlebars';

export default function LoginPage() {

    const navigation = useNavigation<NavigationProp<any>>();

    const [username, setUsername] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();

    function login(username: string | undefined, password: string | undefined) {
        
        // try{
        //     var isLogged = await authService.login(username, password)
        //     return isLogged;
        // }
        // catch(err:any){
        //     return false;
        // }


        
        // return (username === 'uedsonreis' && password === '123456')
    }


    function signin() {
        // if (!login(username, password))
        //     //     Alert.alert('Sucesso');
        //     // else
        //     Alert.alert('Usuario ou senha incorretos');

        authService.login(username, password)
        .then(isLogged => {
            if(isLogged)
                navigation.navigate('Home')
            else
                Alert.alert('Usuario ou senha incorretos 1');
        })
        .catch(err => {
            Alert.alert('Usuario ou senha incorretos 2');
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Página de Acesso</Text>

            <MyInput title='Login' value={username} isPassword={false} change={setUsername} ></MyInput>

            <MyInput title='Senha' value={password} isPassword={true} change={setPassword} ></MyInput>


            <View style={styles.buttonView}>
                <Button title="Entrar" onPress={signin} />
            </View>
        </View>
    );
}

