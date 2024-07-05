import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { FAB, Title, Paragraph } from 'react-native-paper';
import FilmCard from '../components/Film';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CharactersScreen = ({ route }) => {
    const { sceneId } = route.params;
    const [characters, setCharacters] = useState([
        { id: '1', title: 'Character 1', director: 'Director', time: 'Time' },
        { id: '2', title: 'Character 2', director: 'Director', time: 'Time' },
    ]);

    const addCharacter = () => {
        // Lógica para agregar un personaje
    };

    const editCharacter = (id) => {
        // Lógica para editar un personaje
    };

    const deleteCharacter = async (id) => {
        const updatedCharacters = characters.filter(character => character.id !== id);
        setCharacters(updatedCharacters);
        await AsyncStorage.setItem(`characters_${sceneId}`, JSON.stringify(updatedCharacters));
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>CHARACTERS</Title>
            <ScrollView>
                {characters.map(character => (
                    <FilmCard
                        key={character.id}
                        {...character}
                        onEdit={() => editCharacter(character.id)}
                        onDelete={() => deleteCharacter(character.id)}
                    />
                ))}
            </ScrollView>
            <FAB style={styles.fab} icon="plus" onPress={addCharacter} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E003E',
        padding: 16,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#E50082',
    },
});

export default CharactersScreen;
