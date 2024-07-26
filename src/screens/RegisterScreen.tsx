// screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axiosInstance from '../api/axiosConfig';
import { RootStackParamList } from "navigation/AppNavigator";

type RegisterScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Register'
>;

type Props = {
    navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axiosInstance.post('/register', {
                username,
                password,
                email,
            });
            if (response.status === 201) {
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
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
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Register" onPress={handleRegister} />
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

export default RegisterScreen;
