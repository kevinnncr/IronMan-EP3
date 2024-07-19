import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Modal, TouchableOpacity, Text } from 'react-native';
import { FAB, Title } from 'react-native-paper';
import FilmCard from '../components/Film';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CharactersScreen = ({ route }) => {
    const { filmId, sceneId } = route.params;
    const [characters, setCharacters] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentCharacter, setCurrentCharacter] = useState({ title: '', director: '', time: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingCharacterId, setEditingCharacterId] = useState(null);

    useEffect(() => {
        const loadCharacters = async () => {
            const storedCharacters = await AsyncStorage.getItem(`characters_${filmId}_${sceneId}`);
            if (storedCharacters) {
                setCharacters(JSON.parse(storedCharacters));
            }
        };

        loadCharacters();
    }, [filmId, sceneId]);

    const saveCharacters = async (characters) => {
        await AsyncStorage.setItem(`characters_${filmId}_${sceneId}`, JSON.stringify(characters));
    };

    const addCharacter = () => {
        if (isEditing) {
            const updatedCharacters = characters.map(character =>
                character.id === editingCharacterId ? { ...currentCharacter, id: editingCharacterId } : character
            );
            setCharacters(updatedCharacters);
            saveCharacters(updatedCharacters);
            setIsEditing(false);
        } else {
            const id = (characters.length + 1).toString(); // Generar un ID simple
            const updatedCharacters = [...characters, { ...currentCharacter, id }];
            setCharacters(updatedCharacters);
            saveCharacters(updatedCharacters);
        }
        setModalVisible(false);
        setCurrentCharacter({ title: '', director: '', time: '' });
    };

    const editCharacter = (character) => {
        setCurrentCharacter({ title: character.title, director: character.director, time: character.time });
        setEditingCharacterId(character.id);
        setIsEditing(true);
        setModalVisible(true);
    };

    const deleteCharacter = async (id) => {
        const updatedCharacters = characters.filter(character => character.id !== id);
        setCharacters(updatedCharacters);
        saveCharacters(updatedCharacters);
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>CHARACTERS</Title>
            <ScrollView>
                {characters.map(character => (
                    <FilmCard
                        key={character.id}
                        {...character}
                        onEdit={() => editCharacter(character)}
                        onDelete={() => deleteCharacter(character.id)}
                    />
                ))}
            </ScrollView>
            <FAB style={styles.fab} icon="plus" onPress={() => setModalVisible(true)} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={currentCharacter.title}
                            onChangeText={text => setCurrentCharacter({ ...currentCharacter, title: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Director"
                            value={currentCharacter.director}
                            onChangeText={text => setCurrentCharacter({ ...currentCharacter, director: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Time"
                            value={currentCharacter.time}
                            onChangeText={text => setCurrentCharacter({ ...currentCharacter, time: text })}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={addCharacter}>
                                <Text style={styles.buttonText}>{isEditing ? 'Save Changes' : 'Add Character'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CharactersScreen;
