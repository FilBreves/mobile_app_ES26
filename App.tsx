import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './src/pages/Login';
import { CadastroPage } from './src/pages/Cadastro';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/pages/Home';
import RolesPage from './src/pages/Roles';
import { CadastroRolesPage } from './src/pages/CadastroRoles';

const Stack = createNativeStackNavigator();
export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Cadastro" component={CadastroPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Roles" component={RolesPage} />
        <Stack.Screen name="CadastroRoles" component={CadastroRolesPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


