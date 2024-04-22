import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import styles from './styles';
import React, { useSyncExternalStore } from 'react';
import { MyInput } from '../../components/MyInput';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { rolesService } from '../../services/roles.service';

export function CadastroRolesPage() {

    const navigation = useNavigation<NavigationProp<any>>();

    const [name, setName] = React.useState<string>();
    const [description, setDescription] = React.useState<string>();



    function checkFieldsFilling(): boolean {
        return (name == '' || description == '');
    }


    function post() {
        if (checkFieldsFilling()) {
            Alert.alert('Campos em branco');
            return;
        }


        rolesService.create(name, description)
            .then(ok => {
                if (ok) navigation.goBack();
                else
                    Alert.alert('Não foi possivel cadastrar');
            })
            .catch(ex => {
                Alert.alert('Não foi possivel cadastrar');
            })

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Roles</Text>

            <MyInput title='Nome' value={name} isPassword={false} change={setName} ></MyInput>
            <MyInput title='Descrição' value={description} isPassword={false} change={setDescription} ></MyInput>


            <View style={styles.buttonView}>
                <Button title="Cadastrar" onPress={post} />
            </View>
        </View>
    );
}

