import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const AddFriendScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/search', {
                params: { query: searchQuery }
            });
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddFriend = (userId) => {
        // Implement the function to add a friend
        console.log('Added friend with ID:', userId);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Make Group</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for friends"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={users}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userContainer}>
                        <View style={styles.userDetails}>
                            <Text style={styles.userName}>{item.name}</Text>
                            <Text style={styles.userEmail}>{item.email}</Text>
                        </View>
                        <TouchableOpacity style={styles.addButton} onPress={() => handleAddFriend(item.id)}>
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        backgroundColor: '#6200ee',
        padding: 15,
        alignItems: 'center',
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#ffffff',
    },
    searchButton: {
        backgroundColor: '#6200ee',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    searchButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    addButton: {
        backgroundColor: '#6200ee',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 14,
    },
});

export default AddFriendScreen;
