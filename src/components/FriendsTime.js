import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const FriendsTime = ({ navigation }) => {
    const [friendsData, setFriendsData] = useState([
        {
            name: 'John Doe',
            timeData: [
                { subject: 'Math', timeSpent: 120000 },
                { subject: 'Science', timeSpent: 90000 },
                { subject: 'History', timeSpent: 60000 },
            ],
        },
        {
            name: 'Jane Smith',
            timeData: [
                { subject: 'Math', timeSpent: 80000 },
                { subject: 'Science', timeSpent: 70000 },
                { subject: 'History', timeSpent: 50000 },
            ],
        },
        // Add more friends as needed
    ]);

    // Simulate fetching data from a backend
    useEffect(() => {
        // You can replace this with an actual API call
        // axios.get('https://your-backend-api.com/friendsData')
        //   .then(response => {
        //     setFriendsData(response.data);
        //   })
        //   .catch(error => {
        //     console.error('Error fetching data:', error);
        //   });
    }, []);

    const formatTime = (milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
        return `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
    };

    const renderTimeData = (timeData) => (
        <FlatList
            data={timeData}
            keyExtractor={(item) => item.subject}
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.subject}>{item.subject}</Text>
                    <Text style={styles.time}>{formatTime(item.timeSpent)}</Text>
                </View>
            )}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Friends' Time Spent</Text>
            <FlatList
                data={friendsData}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View style={styles.friendContainer}>
                        <Text style={styles.friendName}>{item.name}</Text>
                        {renderTimeData(item.timeData)}
                    </View>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add Friends')}>
                <Text style={styles.buttonText}>Make a Group</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F0F4F8',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    friendContainer: {
        width: '100%',
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    friendName: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        marginBottom: 5,
    },
    subject: {
        fontSize: 18,
        fontWeight: '500',
        color: '#555',
    },
    time: {
        fontSize: 16,
        color: '#888',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#6200EE',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 25,
        shadowColor: '#6200EE',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default FriendsTime;
