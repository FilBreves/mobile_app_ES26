import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import styles from './styles';

type Props = {
    role: any,
};

export function RolesView({ role } : Props ) {
    const navigation = useNavigation<NavigationProp<any>>();


    return (
            <View style={styles.list} >
                <Text>{role.name}</Text>
                <Text>{role.description}</Text>
            </View>
    );
}

