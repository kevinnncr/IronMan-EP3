import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface FilmCardProps {
    title: string;
    director: string;
    time: string;
    onEdit: () => void;
    onDelete: () => void;
    onPress?: () => void; // Hacer onPress opcional
}

const FilmCard: React.FC<FilmCardProps> = ({ title, director, time, onEdit, onDelete, onPress }) => (
    <Card style={styles.card} onPress={onPress}>
        <Card.Content>
            <Title style={styles.cardTitle}>{title}</Title>
            <Paragraph>{director}</Paragraph>
            <Paragraph>{time}</Paragraph>
        </Card.Content>
        <Card.Actions>
            <Ionicons name="pencil" size={24} color="white" onPress={onEdit} />
            <Ionicons name="trash" size={24} color="white" onPress={onDelete} />
        </Card.Actions>
    </Card>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F9FF36',
        marginBottom: 16,
    },
    cardTitle: {
        color: 'black',
    },
});

export default FilmCard;
