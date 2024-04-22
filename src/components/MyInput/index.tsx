import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import styles from './styles';

type Props = {
    title: string,
    value: string | undefined,
    isPassword?: boolean,
    change: (value: string) => void,
    disabled?: boolean

};

export function MyInput(props: Props ) {

    return (
            <View >
                <Text style={styles.label}>{props.title}</Text>
                <TextInput style={styles.input}  
                value={props.value}
                secureTextEntry={props.isPassword}
                onChangeText={props.change}
                readOnly={props.disabled}
                />
            </View>
    );
}

