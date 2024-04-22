import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Dimensions, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import styles from './styles';
import React, { useSyncExternalStore } from 'react';
import { MyInput } from '../../components/MyInput';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { userService } from '../../services/user.service';
import { rolesService } from '../../services/roles.service';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useRoute } from '@react-navigation/native';

export function CadastroPage(navigationParams: any) {

    const route = useRoute();
    const param = route.params ? route.params : undefined;

    const [selectedRoles, setSelectedRoles] = React.useState<{ [id: string]: boolean; }>({});

    const [roles, setRoles] = React.useState<any[]>([]);

    const navigation = useNavigation<NavigationProp<any>>();

    const [name, setName] = React.useState<string>();
    const [username, setUsername] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const [passwordConfirmation, setPasswordConfirmation] = React.useState<string>();

    function validatePassword(password: string | undefined, passwordConfirmation: string | undefined) {
        return (password == passwordConfirmation);
    }

    function checkFieldsFilling(): boolean {
        return (name == '' || username == '' || password == '' || passwordConfirmation == '');
    }

    React.useEffect(() => {
        rolesService.get().then(list => {
            if (list) setRoles(list);
        })
            .catch(ex => {

            })
    },
        [])


    function signup() {
        if (checkFieldsFilling()) {
            Alert.alert('Campos em branco');
            return;
        }

        if (!validatePassword(password, passwordConfirmation)) {
            Alert.alert('Senhas diferentes');
            return;
        }

        console.log('dicti', selectedRoles);

        var roles = Object.keys(selectedRoles).filter(key => selectedRoles[key] === true)


        userService.create(name, username, password, roles)
            .then(ok => {
                if (ok) navigation.goBack();
                else
                    Alert.alert('Não foi possivel cadastrar');
            })
            .catch(ex => {
                Alert.alert('Não foi possivel cadastrar');
            })

    }

    function save() {
        if (navigationParams.route.params) {
            console.log("atualizar");
            console.log(navigationParams);
            update();
        }
        else {
            console.log("cadastrar2");
            console.log(navigationParams);
            signup();
        }
    }

    function update() {

        console.log('id', navigationParams)


        if (checkFieldsFilling()) {
            Alert.alert('Campos em branco');
            return;
        }

        if (!validatePassword(password, passwordConfirmation)) {
            Alert.alert('Senhas diferentes');
            return;
        }

        console.log('dicti', selectedRoles);

        var roles = Object.keys(selectedRoles).filter(key => selectedRoles[key] === true)


        console.log('roles', roles);

        userService.update(navigationParams.route.params.id, name, roles)
            .then(ok => {
                if (ok) navigation.goBack();
                else
                    Alert.alert('Não foi possivel atualizar');
            })
            .catch(ex => {
                Alert.alert('Não foi possivel atualizar');
            })

    }
    const [title, setTitle] = React.useState<string>("");
    const [subTitle, setSubTitle] = React.useState<string>("");


    React.useEffect(() => {
        if (navigationParams.route.params) {
            console.log("atualizar");
            setTitle("Página de Atualização");
            setSubTitle("Atualizando " + navigationParams.route.params.name);
            setName(navigationParams.route.params.name);
            setUsername(navigationParams.route.params.username);

        }
        else {
            console.log("cadastrar1");
            setTitle("Página de Cadastro");
            setSubTitle("Cadastrando novo usuário");
        }

    },
        [])

    function checkIfRolesFilled(role: string) {
        if (!navigationParams.route.params)
            return false;
        if (!navigationParams.route.params.roles)
            return false;

        var found = Object.values(navigationParams.route.params.roles).some(x => x == role);

        return found;
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{title}</Text>
            <Text >{subTitle}</Text>

            <MyInput title='Nome' value={name} isPassword={false} change={setName} ></MyInput>
            <MyInput title='Login' value={username} isPassword={false} change={setUsername} disabled={(navigationParams.route.params)} ></MyInput>

            {
                (!navigationParams.route.params) && (
                    <>
                        <MyInput title='Senha' value={password} isPassword={true} change={setPassword} ></MyInput>
                        <MyInput title='Confirmar Senha' value={passwordConfirmation} isPassword={true} change={setPasswordConfirmation} ></MyInput>
                    </>
                )
            }

            <FlatList
                data={roles}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.list}>
                            <BouncyCheckbox
                                // text={item.name}
                                isChecked={checkIfRolesFilled(item.name)}
                                onPress={(isChecked: boolean) => {
                                    selectedRoles[item.name] = isChecked;
                                }} />
                            <Text>{item.name}</Text>
                        </View>
                    );
                }}
            />
            {/* <MyInput title='Roles (separado por vírgula)' value={passwordConfirmation}  change={setPasswordConfirmation} ></MyInput> */}


            <View style={styles.buttonView}>
                <Button title="Salvar" onPress={save} />
            </View>
        </View>
    );
}

