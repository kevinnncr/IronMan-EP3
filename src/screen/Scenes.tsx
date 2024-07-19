import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Modal, TouchableOpacity, Text } from 'react-native';
import { FAB, Title } from 'react-native-paper';
import FilmCard from '../components/Film';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScenesScreen = ({ route, navigation }) => {
    const { filmId } = route.params;
    const [scenes, setScenes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentScene, setCurrentScene] = useState({ title: '', director: '', time: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingSceneId, setEditingSceneId] = useState(null);

    useEffect(() => {
        const loadScenes = async () => {
            const storedScenes = await AsyncStorage.getItem(`scenes_${filmId}`);
            if (storedScenes) {
                setScenes(JSON.parse(storedScenes));
            }
        };

        loadScenes();
    }, [filmId]);

    const saveScenes = async (scenes) => {
        await AsyncStorage.setItem(`scenes_${filmId}`, JSON.stringify(scenes));
    };

    const addScene = () => {
        if (isEditing) {
            const updatedScenes = scenes.map(scene =>
                scene.id === editingSceneId ? { ...currentScene, id: editingSceneId } : scene
            );
            setScenes(updatedScenes);
            saveScenes(updatedScenes);
            setIsEditing(false);
        } else {
            const id = (scenes.length + 1).toString(); // Generar un ID simple
            const updatedScenes = [...scenes, { ...currentScene, id }];
            setScenes(updatedScenes);
            saveScenes(updatedScenes);
        }
        setModalVisible(false);
        setCurrentScene({ title: '', director: '', time: '' });
    };

    const editScene = (scene) => {
        setCurrentScene({ title: scene.title, director: scene.director, time: scene.time });
        setEditingSceneId(scene.id);
        setIsEditing(true);
        setModalVisible(true);
    };

    const deleteScene = async (id) => {
        const updatedScenes = scenes.filter(scene => scene.id !== id);
        setScenes(updatedScenes);
        saveScenes(updatedScenes);
    };

    const openCharacters = (sceneId) => {
        navigation.navigate('Characters', { filmId, sceneId });
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>SCENES</Title>
            <ScrollView>
                {scenes.map(scene => (
                    <FilmCard
                        key={scene.id}
                        {...scene}
                        onEdit={() => editScene(scene)}
                        onDelete={() => deleteScene(scene.id)}
                        onPress={() => openCharacters(scene.id)}
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
                            value={currentScene.title}
                            onChangeText={text => setCurrentScene({ ...currentScene, title: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Director"
                            value={currentScene.director}
                            onChangeText={text => setCurrentScene({ ...currentScene, director: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Time"
                            value={currentScene.time}
                            onChangeText={text => setCurrentScene({ ...currentScene, time: text })}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={addScene}>
                                <Text style={styles.buttonText}>{isEditing ? 'Save Changes' : 'Add Scene'}</Text>
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
        backgroundColor: '#000000',
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
        backgroundColor: '#001b69',
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

export default ScenesScreen;
