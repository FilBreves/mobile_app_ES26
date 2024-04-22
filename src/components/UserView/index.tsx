import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import styles from './styles';
import { BorderlessButton, GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';


type Props = {
    user: any,
    edit2: (id: number) => void,
    deleteM: (id: number) => void
};

type DeleteProps = {
    remove: () => void,
}

function DeleteButton({remove}: DeleteProps){
    return (
        <View style={styles.deleteContainer}>
            <BorderlessButton onPress={() => remove()}>
                <Text>Delete</Text>
            </BorderlessButton>
        </View>
    )
}

export function UserView({  edit2, deleteM , user}: Props) {
    const navigation = useNavigation<NavigationProp<any>>();

    function edit() {
        navigation.navigate("Cadastro", user);

    }


    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={() => <DeleteButton remove={() => deleteM(user.id)} />}>
                <View style={styles.list} onTouchEnd={() => edit2(user.id)}>
                    <Text>{user.name}</Text>
                    <Text>{user.username}</Text>
                    <Button title="Editar" onPress={edit}></Button>
                </View>
            </Swipeable>
        </GestureHandlerRootView>

    );
}

