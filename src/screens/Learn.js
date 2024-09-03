import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Alert, ScrollView, Modal, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PDFSlideVerticle from "../components/PDFSlideVerticle";
import RNFS from 'react-native-fs';
import { PERMISSIONS, request } from 'react-native-permissions';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Learn = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        labelStyle: { fontSize: 16, fontWeight: 'bold' },
        activeTintColor: '#000',
        inactiveTintColor: '#666',
        indicatorStyle: { backgroundColor: '#000' },
      }}
    >
      <Tab.Screen name="Daily Notes" component={DailyNotesStack} />
      <Tab.Screen name="Monthly Notes" component={MonthlyNotesStack} />
      <Tab.Screen name="Topic" component={TopicsStack} />

    </Tab.Navigator>
  );
};

const DailyNotesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DailyNotes" component={DailyNotesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DailyNoteDetails" component={NoteDetailsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const MonthlyNotesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MonthlyNotes" component={MonthlyNotesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MonthlyNoteDetails" component={NoteDetailsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};


const NoteDetailsScreen = ({ route }) => {
  const { note } = route.params;
  const [userRating, setUserRating] = useState(0); // Default user rating
  const [pdfModalVisible, setPdfModalVisible] = useState(false);

  // Extracting user's rating if it exists
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("id");
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
        {note.date && (
          <Text style={styles.date}>{note.date}</Text>
        )

        }
        {note.createdAt && (
          <Text style={styles.date}>{formatDate(note.createdAt)}</Text>
        )

        }

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

const DailyNotesScreen = ({ navigation }) => {
  const [dailyNotes, setDailyNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("https://d2jju2h99p6xsl.cloudfront.net/api/CAs");
      const data = await response.json();
      console.log(data);
      const filteredData = data.data.filter(note => note.type === "1");
      setDailyNotes(filteredData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const getFirstTwoLines = (content) => {
    const lines = content.split('\n');
    return lines.slice(0, 1).join('\n');
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {dailyNotes.map((note) => (
          <TouchableOpacity key={note._id} onPress={() => navigation.navigate('DailyNoteDetails', { note })}>
            <View style={styles.noteItem}>
              <Text style={styles.topic}>{formatDate(note.createdAt)}</Text>
              <Text style={styles.contentText}>Daily Current Affairs</Text>
              <AverageRating note={note} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const AverageRating = ({ note }) => {
  const [averageRating, setAverageRating] = useState(null);

  const stars = [];
  for (let i = 0; i < 5; i++) {
    const name = i < note.rate ? 'star' : 'star-outline';
    stars.push(
      <Ionicons key={i} name={name} size={20} color="#f39c12" style={{ marginRight: 5 }} />
    );
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      <Text style={{ marginRight: 5, color: "#000000", fontWeight: "bold" }}>{note.rate}</Text>
      {stars}
    </View>
  );
};

const MonthlyNotesScreen = ({ navigation }) => {
  const [monthlyNotes, setMonthlyNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("https://d2jju2h99p6xsl.cloudfront.net/api/CAs");
      const data = await response.json();
      const filteredData = data.data.filter(note => note.type === "2");
      console.log(filteredData);
      setMonthlyNotes(filteredData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const getFirstTwoLines = (content) => {
    const lines = content.split('\n');
    return lines.slice(0, 1).join('\n');
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {monthlyNotes.map((note) => (
          <TouchableOpacity key={note._id} onPress={() => navigation.navigate('MonthlyNoteDetails', { note })}>
            <View style={styles.noteItem}>
              <Text style={styles.topic}>{formatDate(note.createdAt)}</Text>
              <Text style={styles.contentText}>Monthly Current Affairs</Text>
              <AverageRating note={note} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};


const TopicsListScreen = ({ navigation }) => {
  const [topics, setTopics] = useState([
    { _id: '1', title: 'Polity' },
    { _id: '2', title: 'Ancient History' },
    { _id: '3', title: 'Medieval History' },
    { _id: '4', title: 'Modern History' },
    { _id: '5', title: 'Art and Culture' },
    { _id: '6', title: 'Physical Geography' },
    { _id: '7', title: 'Enviroment' },
    { _id: '8', title: 'Science and Technology' },
    { _id: '9', title: 'International Relations' },
  ]);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {topics.map((topic) => (
          <TouchableOpacity
            key={topic._id}
            style={styles.topicItem}
            onPress={() => navigation.navigate('NotesByTopic', { topicId: topic._id, topicTitle: topic.title })}
          >
            <View style={styles.itemContent}>

              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Image
                source={require("../../assets/image/env.png")} // Placeholder image URL
                style={styles.topicImage}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};


const fakeNotes = {
  '1': [
    { _id: '1-1', title: 'Climate Change and Its Impact', content: "https://poller-blog.s3.ap-south-1.amazonaws.com/CAContent/1717039495310__4a6a3b8cd5d6812c52adce2eb27dca95_23Quicksort.pdf", date: "02-06-2024" },
    { _id: '1-2', title: 'Deforestation and Biodiversity Loss', content: "https://poller-blog.s3.ap-south-1.amazonaws.com/CAContent/1717039495310__4a6a3b8cd5d6812c52adce2eb27dca95_23Quicksort.pdf", date: "02-06-2024" },
  ],
  '2': [
    { _id: '2-1', title: 'Latest Advances in AI', content: "https://poller-blog.s3.ap-south-1.amazonaws.com/CAContent/1717039495310__4a6a3b8cd5d6812c52adce2eb27dca95_23Quicksort.pdf", date: "02-06-2024" },
    { _id: '2-2', title: '5G Technology and Its Implications', content: "https://poller-blog.s3.ap-south-1.amazonaws.com/CAContent/1717039495310__4a6a3b8cd5d6812c52adce2eb27dca95_23Quicksort.pdf", date: "02-06-2024" },
  ],
  '3': [
    { _id: '3-1', title: 'Pandemic Preparedness', content: "https://poller-blog.s3.ap-south-1.amazonaws.com/CAContent/1717039495310__4a6a3b8cd5d6812c52adce2eb27dca95_23Quicksort.pdf", date: "02-06-2024" },
    { _id: '3-2', title: 'Advancements in Cancer Treatment', content: "https://poller-blog.s3.ap-south-1.amazonaws.com/CAContent/1717039495310__4a6a3b8cd5d6812c52adce2eb27dca95_23Quicksort.pdf", date: "02-06-2024" },
  ],
  '4': [
    { _id: '4-1', title: 'Recent Elections and Their Outcomes', content: "https://poller-blog.s3.ap-south-1.amazonaws.com/CAContent/1717039495310__4a6a3b8cd5d6812c52adce2eb27dca95_23Quicksort.pdf", date: "02-06-2024" },
    { _id: '4-2', title: 'Policy Changes in Healthcare', content: "https://poller-blog.s3.ap-south-1.amazonaws.com/CAContent/1717039495310__4a6a3b8cd5d6812c52adce2eb27dca95_23Quicksort.pdf", date: "02-06-2024" },
  ],
  '5': [
    { _id: '5-1', title: 'Education Reform Initiatives', content: "https://poller-blog.s3.ap-south-1.amazonaws.com/CAContent/1717039495310__4a6a3b8cd5d6812c52adce2eb27dca95_23Quicksort.pdf", date: "02-06-2024" },
    { _id: '5-2', title: 'The Future of Online Learning', content: "https://poller-blog.s3.ap-south-1.amazonaws.com/CAContent/1717039495310__4a6a3b8cd5d6812c52adce2eb27dca95_23Quicksort.pdf", date: "02-06-2024" },
  ],
};

const NotesByTopicScreen = ({ route, navigation }) => {
  const { topicId, topicTitle } = route.params;
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotesByTopic();
  }, []);

  const fetchNotesByTopic = () => {
    // Using fake notes instead of fetching from an API
    setNotes(fakeNotes[topicId] || []);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>{topicTitle}</Text>
        {notes.map((note) => (
          <TouchableOpacity
            key={note._id}
            style={styles.noteItem}
            onPress={() => navigation.navigate('NoteDetails', { note })}
          >
            <Text style={styles.noteTitle}>{note.date}</Text>
            <Text style={styles.noteTitle}>{note.title}</Text>

          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const TopicsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TopicsList" component={TopicsListScreen} options={{ title: 'Topics' }} />
      <Stack.Screen name="NotesByTopic" component={NotesByTopicScreen} options={{ title: 'Notes' }} />
      <Stack.Screen name="NoteDetails" component={NoteDetailsScreen} options={{ title: 'Note Details' }} />
    </Stack.Navigator>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  topic: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  contentText: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
    marginBottom: 20,
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
  date: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
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
    bottom: 10,
    left: 10,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
    padding: 10,
    position: 'absolute',
    bottom: 10,
    right: 10,
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
  content: {
    flexGrow: 1,
    padding: 16,
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
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

export default Learn;
