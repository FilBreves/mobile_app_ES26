import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Dimensions, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import styles from './styles';
import React from 'react';
import { MyInput } from '../../components/MyInput';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { authRepository } from '../../services/auth.repository';
import { userService } from '../../services/user.service';
import { UserView } from '../../components/UserView';
import { useFocusEffect } from '@react-navigation/native';
import { Exception } from 'handlebars';

export default function HomePage() {

    const [user, setUser] = React.useState({ name: '' });
    const [users, setUsers] = React.useState<any[]>([]);

    const navigation = useNavigation<NavigationProp<any>>();

    navigation.setOptions({
        headerLeft: () => <Button title="Sair" onPress={logOut} />,
        headerRight: () => <Button title="Add" onPress={add} />
    });

    authRepository.getLoggedUser().then(logged => setUser(logged));

    function logOut() {
        navigation.goBack();
    }

    function add() {
        navigation.navigate("Cadastro");
    }

    function toRoles() {
        navigation.navigate("Roles");

    }

    React.useEffect(() => {
        userService.get().then(list => {
            if (list) setUsers(list);
            else logOut();
        })
            .catch(ex => {

            })
    },
        [])

    useFocusEffect(
        React.useCallback(() => {
            userService.get().then(list => {
                if (list) setUsers(list);
                else logOut();
            })
                .catch(ex => {

                })
        },
            [])
    )

    const [refreshing, setRefreshing] = React.useState(false);

    async function fetchUser() {
        setRefreshing(true);
        try{
            const list = await userService.get();
            if (list) setUsers(list);
            else logOut();
        }
        catch(ex){
            console.log(ex);
        }
        setRefreshing(false);
    }

    function removeUser(id: number){
        userService.delete(id).then(isDeleted => {
            if(isDeleted) fetchUser();
        })
    }

    
    function editUser(id: number){
        // userService.update(id).then(isDeleted => {
        //     if(isDeleted) fetchUser();
        // })

        //navigation => cadastro
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listagem de Usuários</Text>
            <Text>Seja bem vindo, {user.name}</Text>
            <Text>Temos {users.length} usuários</Text>

            <FlatList
                data={users}
                onRefresh={fetchUser}
                refreshing={refreshing}
                renderItem={({ item }) => <UserView deleteM={removeUser} edit2={editUser} user={item} />}
            />

            <Button title='Roles' onPress={toRoles}></Button>

        </View >
    );
}


