import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Modal, TouchableOpacity, Text } from 'react-native';
import { FAB, Title } from 'react-native-paper';
import FilmCard from '../components/Film';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FilmsScreen = ({ navigation }) => {
    const [films, setFilms] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentFilm, setCurrentFilm] = useState({ title: '', director: '', time: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingFilmId, setEditingFilmId] = useState(null);

    useEffect(() => {
        const loadFilms = async () => {
            const storedFilms = await AsyncStorage.getItem('films');
            if (storedFilms) {
                setFilms(JSON.parse(storedFilms));
            }
        };

        loadFilms();
    }, []);

    const saveFilms = async (films) => {
        await AsyncStorage.setItem('films', JSON.stringify(films));
    };

    const addFilm = () => {
        if (isEditing) {
            const updatedFilms = films.map(film =>
                film.id === editingFilmId ? { ...currentFilm, id: editingFilmId } : film
            );
            setFilms(updatedFilms);
            saveFilms(updatedFilms);
            setIsEditing(false);
        } else {
            const id = (films.length + 1).toString(); // Generar un ID simple
            const updatedFilms = [...films, { ...currentFilm, id }];
            setFilms(updatedFilms);
            saveFilms(updatedFilms);
        }
        setModalVisible(false);
        setCurrentFilm({ title: '', director: '', time: '' });
    };

    const editFilm = (film) => {
        setCurrentFilm({ title: film.title, director: film.director, time: film.time });
        setEditingFilmId(film.id);
        setIsEditing(true);
        setModalVisible(true);
    };

    const deleteFilm = async (id) => {
        const updatedFilms = films.filter(film => film.id !== id);
        setFilms(updatedFilms);
        saveFilms(updatedFilms);
    };

    const openScenes = (id) => {
        navigation.navigate('Scenes', { filmId: id });
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>IRON-MAN</Title>
            <ScrollView>
                {films.map(film => (
                    <FilmCard
                        key={film.id}
                        {...film}
                        onEdit={() => editFilm(film)}
                        onDelete={() => deleteFilm(film.id)}
                        onPress={() => openScenes(film.id)}
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
                            value={currentFilm.title}
                            onChangeText={text => setCurrentFilm({ ...currentFilm, title: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Director"
                            value={currentFilm.director}
                            onChangeText={text => setCurrentFilm({ ...currentFilm, director: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Time"
                            value={currentFilm.time}
                            onChangeText={text => setCurrentFilm({ ...currentFilm, time: text })}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={addFilm}>
                                <Text style={styles.buttonText}>{isEditing ? 'Save Changes' : 'Add Film'}</Text>
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
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#ebf600',
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

export default FilmsScreen;
