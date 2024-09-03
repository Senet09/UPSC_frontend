import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NoCardNotification = ({ onClose }) => {
    return (
        <View style={styles.container}>
            <View style={styles.notification}>
                <Text style={styles.text}>No cards available for revision</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close-circle-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000',

    },
    notification: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    closeButton: {
        marginLeft: 10,
    },
});

export default NoCardNotification;
