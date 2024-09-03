import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UnAttemptedMains = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleQuestions, setVisibleQuestions] = useState(3);
    const [showAllQuestions, setShowAllQuestions] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('https://d2jju2h99p6xsl.cloudfront.net/api/mains/getmainQuestions');
                const data = await response.json();
                const userId = await AsyncStorage.getItem('id');
                const filteredQuestions = data.filter(question => !question.files.some(file => file.userId === userId));
                setQuestions(filteredQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleQuestionPress = (question) => {
        navigation.navigate('Submissions', { question });
    };

    const renderQuestionItem = ({ item }) => {
        if (selectedTopic && item.topic !== selectedTopic) {
            return null;
        }

        if (!showAllQuestions && questions.indexOf(item) >= visibleQuestions) {
            return null;
        }

        const partialText = item.question.length > 90 ? item.question.substring(0, 90) + '...' : item.question;

        const formatDate = (date) => {
            const d = new Date(date);
            const day = d.getDate();
            const month = d.getMonth() + 1;
            const year = d.getFullYear();
            return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
        };

        const getTimeDifference = (createdAt) => {
            const currentTime = new Date();
            const fileTime = new Date(createdAt);
            const diff = Math.abs(currentTime - fileTime);
            const minutes = Math.floor(diff / (1000 * 60));
            if (minutes < 60) {
                return `${minutes} min`;
            } else {
                const hours = Math.floor(minutes / 60);
                if (hours < 24) {
                    return `${hours} hour${hours > 1 ? 's' : ''}`;
                } else {
                    const days = Math.floor(hours / 24);
                    return `${days} day${days > 1 ? 's' : ''}`;
                }
            }
        };

        if (searchQuery && !item.question.toLowerCase().includes(searchQuery.toLowerCase())) {
            return null;
        }

        const lastFileCreatedAt = item.files.length > 0 ? item.files[item.files.length - 1].createdAt : null;
        const lastAnswer = lastFileCreatedAt ? getTimeDifference(lastFileCreatedAt) : 'No submissions';

        return (
            <TouchableOpacity style={styles.questionItem} onPress={() => handleQuestionPress(item)}>
                <Text style={styles.questionText}>{partialText}</Text>
                <View style={styles.questionDetails}>
                    <Text style={styles.questionDetailsText}>{formatDate(item.createdAt)}</Text>
                    <Text style={styles.questionDetailsText}>GS {item.topic} | Submission No: {item.files.length}</Text>
                    <Text style={styles.questionDetailsText}>Last answer: {lastAnswer}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const handleTopicFilter = (topic) => {
        setSelectedTopic(topic === selectedTopic ? null : topic);
    };

    const loadMoreQuestions = () => {
        setVisibleQuestions(prev => prev + 5);
    };

    const toggleShowAllQuestions = () => {
        setShowAllQuestions(prev => !prev);
    };


    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, selectedTopic === "1" && styles.selectedFilterButton]}
                    onPress={() => handleTopicFilter("1")}>
                    <Text style={styles.filterButtonText}>GS 1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, selectedTopic === "2" && styles.selectedFilterButton]}
                    onPress={() => handleTopicFilter("2")}>
                    <Text style={styles.filterButtonText}>GS 2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, selectedTopic === "3" && styles.selectedFilterButton]}
                    onPress={() => handleTopicFilter("3")}>
                    <Text style={styles.filterButtonText}>GS 3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, selectedTopic === "4" && styles.selectedFilterButton]}
                    onPress={() => handleTopicFilter("4")}>
                    <Text style={styles.filterButtonText}>GS 4</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <FlatList
                data={questions}
                renderItem={renderQuestionItem}
                keyExtractor={(item) => item._id}
            />
            {questions.length >= visibleQuestions && (
                <View style={styles.showMoreButtonContainer}>
                    <TouchableOpacity style={styles.showMoreButton} onPress={loadMoreQuestions}>
                        <Text style={styles.showMoreButtonText}>Show More...</Text>
                    </TouchableOpacity>

                    <TouchableWithoutFeedback onPress={toggleShowAllQuestions}>
                        <View style={styles.iconButton}>
                            <Ionicons name={showAllQuestions ? 'arrow-up-circle-outline' : 'arrow-down-circle-outline'} size={30} color="#000" />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )}
            {questions.length < visibleQuestions && (
                <View style={styles.showMoreButtonContainer}>
                    <TouchableOpacity style={styles.showMoreButton} >
                        <Text style={styles.showMoreButtonText}>That All!</Text>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback onPress={() => setVisibleQuestions(3)}>
                        <View style={styles.iconButton}>
                            <Ionicons name='arrow-up-circle-outline' size={30} color="#000" />
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedFilterButton: {
        backgroundColor: 'lightblue',
    },
    questionItem: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        borderLeftWidth: 5,
        borderLeftColor: "#00008b",
        marginBottom: 20,
        padding: 20,
    },
    questionText: {
        color: "#000",
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    questionDetails: {
        flexDirection: 'column',
    },
    questionDetailsText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    filterButtonText: {
        color: "#000000"
    },
    searchContainer: {
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    showMoreButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    showMoreButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#00008b',
        width: "70%",
        borderRadius: 10,
        alignItems: "center",
        marginRight: 10,
    },
    showMoreButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    iconButton: {
        padding: 10,
    },
});

export default UnAttemptedMains;
