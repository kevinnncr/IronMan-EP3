// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axiosInstance from '../api/axiosConfig';
import {RootStackParamList} from "navigation/AppNavigator";

type LoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Login'
>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post('/login', {
                username,
                password,
            });
            if (response.status === 200) {
                // Guardar token o manejar sesión
                navigation.navigate('Films');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F1F1F',
    },
    title: {
        fontSize: 24,
        color: '#FF0000',
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#FFF',
        borderRadius: 5,
    },
});

export default LoginScreen;
