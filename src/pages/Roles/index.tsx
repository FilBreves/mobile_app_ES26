import { Alert, Button, Dimensions, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import styles from './styles';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { rolesService } from '../../services/roles.service';
import { RolesView } from '../../components/RolesView';
import { useFocusEffect } from '@react-navigation/native';

export default function RolesPage() {

    const [roles, setRoles] = React.useState<any[]>([]);

    const navigation = useNavigation<NavigationProp<any>>();

    navigation.setOptions({
        headerLeft: () => <Button title="Voltar" onPress={logOut} />,
        headerRight: () => <Button title="Add" onPress={add} />
    });


    function logOut() {
        navigation.goBack();
    }

    function add() {
        navigation.navigate("CadastroRoles");
    }



    React.useEffect(() => {
        rolesService.get().then(list => {
            if (list) setRoles(list);
            else logOut();
        })
            .catch(ex => {

            })
    },
    [])

    useFocusEffect(
        React.useCallback(() => {
            rolesService.get().then(list => {
                if (list) setRoles(list);
                else logOut();
            })
                .catch(ex => {
    
                })
        },
            [])
    )



    return (
        <View style={styles.container}>
            <Text>Temos {roles.length} roles</Text>

            <FlatList
                data={roles}
                renderItem={({ item }) => <RolesView role={item} />}
            />
        </View >
    );
}

