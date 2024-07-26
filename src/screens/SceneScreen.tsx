// screens/ScenesScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import axiosInstance from '../api/axiosConfig';

interface Scene {
    id: number;
    description: string;
    budget: number;
    minutes: number;
    film_id: number;
}

type RouteParams = {
    ScenesScreen: {
        filmId: number;
    };
};

const ScenesScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RouteParams, 'ScenesScreen'>>();
    const { filmId } = route.params;
    const [scenes, setScenes] = useState<Scene[]>([]);

    useEffect(() => {
        const fetchScenes = async () => {
            try {
                const response = await axiosInstance.get(`/films/${filmId}/scenes`);
                setScenes(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchScenes();
    }, [filmId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scenes</Text>
            <Button title="Add Scene" onPress={() => {}} />
            <FlatList
                data={scenes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.sceneItem}>
                        <Text style={styles.sceneTitle}>{item.description}</Text>
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
    sceneItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#333',
        borderRadius: 5,
    },
    sceneTitle: {
        color: '#FFF',
    },
});

export default ScenesScreen;
