
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PDFSlideVerticle from "../components/PDFSlideVerticle";
import RNFS from 'react-native-fs';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();


const CaNoteDetailsScreen = ({ route }) => {
    const { note } = route.params;
    const [userRating, setUserRating] = useState(0); // Default user rating
    const [pdfModalVisible, setPdfModalVisible] = useState(false);

    // Extracting user's rating if it exists
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem("id");
                console.log(note)
                const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/getrating/${userId}/${note._id}`);
                const data = await response.json();
                if (data.success) {
                    setUserRating(data.rating);
                }
            } catch (error) {
                console.error('Error fetching user rating:', error);
            }
        };

        fetchData();
    }, [note._id]);

    const StarRating = ({ rating, size = 24, color = '#f39c12', editable = false, onRatingChange }) => {
        const handleStarPress = (index) => {
            if (!editable) return;
            const newRating = index + 1;
            onRatingChange(newRating);
        };

        const renderStars = () => {
            const stars = [];

            for (let i = 0; i < 5; i++) {
                const name = i < rating ? 'star' : 'star-outline';
                stars.push(
                    <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
                        <Ionicons name={name} size={size} color={color} />
                    </TouchableOpacity>
                );
            }

            return stars;
        };

        return <View style={{ flexDirection: 'row' }}>{renderStars()}</View>;
    };

    // Function to handle rating change
    const handleRatingChange = async (rating) => {
        try {
            console.log("Rating changed:", note._id, rating);
            const userId = await AsyncStorage.getItem("id");
            const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/add-rating`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    noteId: note._id,
                    userId: userId,
                    rate: rating,
                }),
            });
            if (response.ok) {
                console.log("Rating updated successfully");
                setUserRating(rating); // Update userRating state after successful rating update
            }
        } catch (error) {
            console.error('Error updating rating:', error);
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-based
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };
    const handleDownload = async () => {
        try {
            const downloadDest = `${RNFS.DownloadDirectoryPath}/${note.title}.pdf`;
            const options = {
                fromUrl: note.content, // URL to the PDF
                toFile: downloadDest,
                background: true, // Enable the download to continue in the background
                progressDivider: 1, // Report download progress every 1%
            };

            const response = await RNFS.downloadFile(options).promise;
            if (response.statusCode === 200) {
                Alert.alert('Success', 'File downloaded successfully');
                console.log('File downloaded to:', downloadDest);
            } else {
                Alert.alert('Error', 'Failed to download file');
            }
        } catch (error) {
            console.error('Error downloading file:', error);
            Alert.alert('Error', 'An error occurred while downloading the file');
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.topic}>{note.title}</Text>
                <Text style={styles.date}>{formatDate(note.createdAt)}</Text>
                <PDFSlideVerticle link={note.content} />
            </ScrollView>

            <Modal
                visible={pdfModalVisible}
                animationType="slide"
                onRequestClose={() => setPdfModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => setPdfModalVisible(false)} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <PDFSlideVerticle link={note.content} />
                </View>
            </Modal>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleDownload} style={styles.downloadButton}>
                    <Ionicons name="download-outline" size={24} color="black" />
                    <Text style={styles.downloadButtonText}>Download PDF</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setPdfModalVisible(true)} style={styles.zoomButton}>
                    <Ionicons name="expand" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 16,
    },
    content: {
        flexGrow: 1,
    },
    topic: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    date: {
        fontSize: 16,

        marginBottom: 10,
        color: '#000',
    },
    contentText: {
        fontSize: 16,
        color: '#000000',
        lineHeight: 24,
        marginBottom: 20
    },
    noteItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    image: {
        width: '100%',
        aspectRatio: 16 / 9, // Adjust aspect ratio as needed for the image
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    zoomButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 50,
        padding: 10,
        position: 'absolute',
        bottom: 5,
        left: 5,
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 50,
        padding: 10,
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    downloadButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: '#f4f4f4',
    },

    topicItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingLeft: 16,
        paddingRight: 10,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        flexDirection: 'row', // Added to arrange text and image in a row
        alignItems: 'center', // Center the content vertically
        height: 140, // Increase the height of each item
    },
    itemContent: {
        flexDirection: 'row', // Arrange text and image in a row
        alignItems: 'center', // Center the content vertically
        justifyContent: 'space-between', // Add space between text and image
        flex: 1,
    },
    topicTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        flex: 1, // Allow the text to take up remaining space
    },
    topicImage: {
        width: 120,
        height: 120,
        // Make the image round
    },

    noteItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    noteTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default CaNoteDetailsScreen;