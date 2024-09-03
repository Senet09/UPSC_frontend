import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const SubjectTime = ({ navigation }) => {
    const [timeData, setTimeData] = useState([
        { subject: 'Math', timeSpent: 120000 },
        { subject: 'Science', timeSpent: 90000 },
        { subject: 'History', timeSpent: 60000 },
    ]);

    // Simulate fetching data from a backend
    useEffect(() => {
        // You can replace this with an actual API call
        // axios.get('https://your-backend-api.com/timeData')
        //   .then(response => {
        //     setTimeData(response.data);
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Time Spent on Subjects</Text>
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
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Friends Time')}>
                <Text style={styles.buttonText}>Friends Time</Text>
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
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        padding: 15,
        marginBottom: 15,
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

export default SubjectTime;
