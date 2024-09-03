import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GenerateQuestion = ({ navigation }) => {
  const [selectedPlaceholder, setSelectedPlaceholder] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Make API call to fetch questions
        const response = await fetch('https://d2jju2h99p6xsl.cloudfront.net/api/mains/getmainQuestions');
        const data = await response.json();
        console.log(data)
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionPress = (question) => {
    navigation.navigate('Submissions', { question });
  };



  const placeholderOptions = ['GS1', 'GS2', 'GS3', 'GS4', 'GS5'];

  const topics = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5'];

  const questionsArray = [
    {
      id: 1,
      text: 'What are the main features of Vedic society and religion? Do you think some of the features are still prevailing in Indian society?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 2,
    },
    // Add more questions here
  ];



  const generateQuestions = () => {
    // Logic to generate questions...
    navigation.navigate("MainsQuestionList")
  };

  const handleUpload = () => {

  }
  return (
    <View style={styles.container}>
      {/* Question of the Day */}
      <Text style={styles.questionOfTheDay}>Question of the Day</Text>
      <TouchableOpacity style={styles.questionItem} onPress={() => questions[2] && handleQuestionPress(questions[2])}>
        {questions[2] && (
          <Text style={styles.questionText}>{questions[2].question}</Text>

        )}
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.personalizeButton}>
        <Image source={require("../../assets/icons/setting.png")} style={styles.iconImage} />
        <Text style={styles.personalizeButtonText}>Personalize your Question</Text>
      </TouchableOpacity> */}


      {/* Rest of the content */}
      <View style={styles.questionList}>

        <Text style={styles.questionText}>Previous Uploaded Question</Text>

        {questions[2] && (
          <TouchableOpacity key={questions[0]._id} style={styles.questionItem} onPress={() => handleQuestionPress(questions[0])}>

            <Text style={styles.questionText}>Q</Text>

            <Text style={styles.questionText}>{questions[0].question}</Text>




          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.PreviousUploadedButton} onPress={() => navigation.navigate("MainsQuestionList")}>

          <Text style={styles.PreviousButtonText}>Show More...</Text>
        </TouchableOpacity>
      </View>
      {/* Modal for Personalized Question */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Modal Content */}
          {/* Placeholder Dropdown */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedPlaceholder}
              onValueChange={(itemValue) => setSelectedPlaceholder(itemValue)}
              style={styles.dropdown}
            >
              <Picker.Item label="GS1" value="" />
              {placeholderOptions.map((placeholder, index) => (
                <Picker.Item key={index} label={placeholder} value={placeholder} />
              ))}
            </Picker>

            {/* Topic Dropdown */}
            <Picker
              selectedValue={selectedTopic}
              onValueChange={(itemValue) => setSelectedTopic(itemValue)}
              style={styles.dropdown}
            >
              <Picker.Item label="Topic" value="" />
              {topics.map((topic, index) => (
                <Picker.Item key={index} label={topic} value={topic} />
              ))}
            </Picker>
          </View>
          {/* Counter and Generate Questions Button */}
          <View style={styles.counterContainer}>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => setNumQuestions(Math.max(numQuestions - 1, 0))}>
                <Text style={styles.counterButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterText}>{numQuestions}</Text>
              <TouchableOpacity onPress={() => setNumQuestions(numQuestions + 1)}>
                <Text style={styles.counterButton}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={generateQuestions} style={styles.generateButton}>
              <Text style={styles.generateButtonText}>Generate Questions</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.personalizeButton}>
            <Text style={styles.personalizeButtonText}>Previous Generated Question</Text>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  // Existing styles...

  // New styles for Question of the Day and Personalize Button
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  dropdown: {
    width: '47%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 2, // Optional: Adjust padding if needed
    backgroundColor: '#E5E5E5', // Add a background color for better visibility
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: "85%"
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    marginHorizontal: 5,
    fontSize: 20,
  },
  counterText: {
    fontSize: 16,
    color: '#000'
  },
  generateButton: {
    backgroundColor: '#00008d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  generateButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  questionList: {
    marginVertical: 20,
    paddingTop: 10,
    borderTopColor: "#00008b",
    borderTopWidth: 5,
    borderRadius: 10
  },
  questionItem: {
    marginBottom: 6,
    padding: 10,
    borderWidth: 1,
    elevation: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  questionText: {
    color: "#000",
    fontSize: 18,
    marginBottom: 4
  },
  questionOfTheDay: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000'
  },
  personalizeButton: {
    backgroundColor: '#ffffff',
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 40
  },
  personalizeButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
  },
  PreviousUploadedButton: {
    backgroundColor: '#00008b',
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 20
  },
  PreviousButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40,
    marginTop: 200,
    marginBottom: 200,
    borderWidth: 2 // Margin for the modal from the edges of the screen
  },
  uploadButton: {
    position: 'absolute',
    bottom: 20, // Adjust the distance from the bottom
    right: 20, // Adjust the distance from the right
    backgroundColor: '#27ae60',
    borderRadius: 25,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Optional: Add elevation for a shadow effect
  },
  uploadText: {
    color: 'white',
    fontWeight: 'bold',
  },
  iconImage: {

    height: 60,
    width: 60
  },
  // Additional modal content styles...
});

export default GenerateQuestion;
