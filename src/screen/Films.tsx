import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { FAB, Title, Paragraph } from 'react-native-paper';
import FilmCard from '../components/Film';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FilmsScreen = ({ navigation }) => {
    const [films, setFilms] = useState([
        { id: '1', title: 'Iron Man', director: 'Director', time: 'Time' },
        { id: '2', title: 'Iron Man 2', director: 'Director', time: 'Time' },
        { id: '3', title: 'Iron Man 3', director: 'Director', time: 'Time' },
    ]);

    const addFilm = () => {
        // Lógica para agregar una película
    };

    const editFilm = (id) => {
        // Lógica para editar una película
    };

    const deleteFilm = async (id) => {
        const updatedFilms = films.filter(film => film.id !== id);
        setFilms(updatedFilms);
        await AsyncStorage.setItem('films', JSON.stringify(updatedFilms));
    };

    const openScenes = (id) => {
        navigation.navigate('Scenes', { filmId: id });
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>IRON-MAN</Title>
            <Paragraph style={styles.subtitle}>FILMS</Paragraph>
            <ScrollView>
                {films.map(film => (
                    <FilmCard
                        key={film.id}
                        {...film}
                        onEdit={() => editFilm(film.id)}
                        onDelete={() => deleteFilm(film.id)}
                        onPress={() => openScenes(film.id)}
                    />
                ))}
            </ScrollView>
            <FAB style={styles.fab} icon="plus" onPress={addFilm} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BE3232',
        padding: 16,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
    },
    subtitle: {
        color: '#100303',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 16,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#ebf600',
    },
});

export default FilmsScreen;
