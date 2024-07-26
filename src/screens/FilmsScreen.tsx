// screens/FilmsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../api/axiosConfig';

interface Film {
    id: number;
    title: string;
    director: string;
    duration: number;
}

const FilmsScreen = () => {
    const navigation = useNavigation();
    const [films, setFilms] = useState<Film[]>([]);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await axiosInstance.get('/films');
                setFilms(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFilms();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Films</Text>
            <Button title="Add Film" onPress={() => {}} />
            <FlatList
                data={films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.filmItem}>
                        <Text style={styles.filmTitle}>{item.title}</Text>
                    </View>
                )}
            />
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
    filmItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#333',
        borderRadius: 5,
    },
    filmTitle: {
        color: '#FFF',
    },
});

export default FilmsScreen;
