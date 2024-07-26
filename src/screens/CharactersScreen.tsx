// screens/CharactersScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import axiosInstance from '../api/axiosConfig';

interface Character {
    id: number;
    fullname: string;
    description: string;
    cost: number;
    stock: number;
    scene_id: number;
}

type RouteParams = {
    CharactersScreen: {
        sceneId: number;
    };
};

const CharactersScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RouteParams, 'CharactersScreen'>>();
    const { sceneId } = route.params;
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axiosInstance.get(`/scenes/${sceneId}/characters`);
                setCharacters(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCharacters();
    }, [sceneId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Characters</Text>
            <Button title="Add Character" onPress={() => {}} />
            <FlatList
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.characterItem}>
                        <Text style={styles.characterTitle}>{item.fullname}</Text>
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
    characterItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#333',
        borderRadius: 5,
    },
    characterTitle: {
        color: '#FFF',
    },
});

export default CharactersScreen;
