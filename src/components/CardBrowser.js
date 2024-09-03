import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardsScreen = ({ route }) => {
    const [questions, setQuestions] = useState([]);
    const [userId, setUserId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const { isRevised } = route.params || { isRevised: null };

    useEffect(() => {
        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchCardsByUserId();
        }
    }, [userId]);

    useEffect(() => {
        filterQuestions();
    }, [searchTerm, questions]);

    const fetchUserId = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('id');
            if (storedUserId !== null) {
                setUserId(storedUserId);
            }
        } catch (error) {
            console.error('Error fetching userId:', error);
        }
    };

    const fetchCardsByUserId = async () => {
        try {
            const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/cards/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch cards');
            }
            const data = await response.json();
            setQuestions(data);

            if (isRevised !== null) {
                setFilteredQuestions(data.filter(card => card.isRevised === isRevised));
            } else {
                setFilteredQuestions(data);
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const filterQuestions = () => {
        let filtered = questions;

        if (searchTerm.trim() !== '') {
            filtered = filtered.filter((card) =>
                card.tag.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (isRevised !== null) {
            filtered = filtered.filter(card => card.isRevised === isRevised);
        }

        setFilteredQuestions(filtered);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search by tags..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <ScrollView contentContainerStyle={styles.content}>
                {filteredQuestions.map((card) => (
                    <View key={card._id}>
                        <View style={styles.tagsContainer}>
                            <Text style={styles.tag}>Tag: {card.tag}</Text>
                        </View>
                        <View style={styles.card}>
                            <View style={styles.cardSide}>
                                <Text style={styles.question}>Q: {card.question}</Text>
                            </View>
                            <View style={styles.cardSide}>
                                <Text style={styles.answer}>A: {card.answer}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        margin: 16,
    },
    content: {
        flexGrow: 1,
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        flexWrap: 'wrap',
    },
    cardSide: {
        flex: 1,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    answer: {
        fontSize: 16,
        color: '#000',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,

    },
    tag: {
        backgroundColor: '#00008b',
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 4,
        marginBottom: 4,
        fontSize: 14,
        color: "#fff"
    },
});

export default CardsScreen;
