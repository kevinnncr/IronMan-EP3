import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { FAB, Title, Paragraph } from 'react-native-paper';
import FilmCard from '../components/Film';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScenesScreen = ({ route, navigation }) => {
    const { filmId } = route.params;
    const [scenes, setScenes] = useState([
        { id: '1', title: 'muere iron man', director: 'Director', time: 'Time' },
        { id: '2', title: 'Scene 2', director: 'Director', time: 'Time' },
    ]);

    const addScene = () => {
        // Lógica para agregar una escena
    };

    const editScene = (id) => {
        // Lógica para editar una escena
    };

    const deleteScene = async (id) => {
        const updatedScenes = scenes.filter(scene => scene.id !== id);
        setScenes(updatedScenes);
        await AsyncStorage.setItem(`scenes_${filmId}`, JSON.stringify(updatedScenes));
    };

    const openCharacters = (id) => {
        navigation.navigate('Characters', { sceneId: id });
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>SCENES</Title>
            <ScrollView>
                {scenes.map(scene => (
                    <FilmCard
                        key={scene.id}
                        {...scene}
                        onEdit={() => editScene(scene.id)}
                        onDelete={() => deleteScene(scene.id)}
                        onPress={() => openCharacters(scene.id)}
                    />
                ))}
            </ScrollView>
            <FAB style={styles.fab} icon="plus" onPress={addScene} />
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
});

export default ScenesScreen;
