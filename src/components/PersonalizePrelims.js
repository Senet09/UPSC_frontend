import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PersonaliseTestList from './PersionalizeTestList';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const GeneratePage = () => {
  const navigation = useNavigation();
  const [counterOne, setCounterOne] = useState(20);
  const [counterTwo, setCounterTwo] = useState(20);
  const [selectedPlaceholder, setSelectedPlaceholder] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [generatedTest, setGeneratedTest] = useState([]);
  const [email, setEmail] = useState("utkarsh@gmail.com");
  const [name, setName] = useState("Personalize")
  const [topic, setTopic] = useState("Personalize")
  const placeholderOptions = ['Ancient Indian History', 'Medieval Indian History', 'Modern Indian History', 'Art and Culture', 'Polity', 'Economy', 'Environment', 'Geography', 'Science and Tech'];
  const topics = ['Basic Numeracy', 'Interpersonal Skills', 'Decision-Making and Problem-Solving', 'General Mental Ability', 'Reading comprehension', 'Data Interpretation', 'Reasoning'];
  const [testGeneratedSuccessfully, setTestGeneratedSuccessfully] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [remain, setRemain] = useState(null);
  const [selectedCounterValue, setSelectedCounterValue] = useState('');
  const predefinedCounterValues = [30, 50, 70, 80, 100];
  const incrementCounterOne = () => {
    if (counterOne < remain) {
      setCounterOne(counterOne + 1);
    }
  };

  const decrementCounterOne = () => {
    if (counterOne > 10) {
      setCounterOne(counterOne - 1);
    }
  };

  const incrementCounterTwo = () => {
    if (counterTwo < remain) {
      setCounterTwo(counterTwo + 1);
    }
  };

  const decrementCounterTwo = () => {
    if (counterTwo > 10) {
      setCounterTwo(counterTwo - 1);
    }
  };

  useEffect(() => {
    if (remain !== null) {
      if (remain > 20) {
        setCounterOne(20);
        setCounterTwo(20);
      } else {
        setCounterOne(remain);
        setCounterTwo(remain);
      }
    }
  }, [remain]);
  useEffect(() => {

    const fetchUserProfile = async () => {
      try {
        // Get the JWT token from AsyncStorage
        const userId = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('authToken');

        // Make an HTTP GET request to the '/profile' route on your server
        const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/v1/profile/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the JWT token in the request headers
          },
        });

        // Parse the JSON response
        const data = await response.json();

        // Check if the request was successful
        if (response.ok) {
          // Extract user profile data from the response

          console.log(data)

          // Update the state with the user profile data
          setUserProfile(data);
          setRemain(data.numberOfQuestionRemaining)
        } else {
          // Handle error responses (e.g., unauthorized access)
          console.error('Error fetching user profile:', data.message);
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('Fetch error:', error.message);
      }
    };

    // Call the fetchUserProfile function when the component mounts
    fetchUserProfile();
  }, []); // Empty depend

  const fetchItem = async () => {
    const userId = await AsyncStorage.getItem('id')
    // Add logic to fetch items based on selected values from your backend
    try {
      const response = await fetch('https://d2jju2h99p6xsl.cloudfront.net/api/v1/tr/generate-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          topic,
          userId,
          numberOfQuestions: counterOne,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedTest(data);
        console.log(generatedTest)
        setIsModalVisible(true);
      } else {
        console.error('Failed to fetch test data');
        setTestGeneratedSuccessfully(false);
      }
    } catch (error) {
      console.error('Error fetching test data:', error);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAttemptNow = () => {
    // Add logic to navigate to the attempt screen immediately
    navigation.navigate('TestOverview', {
      name,
      topic: "Personalize Test",
      topicId: "0",
      id: generatedTest._id,// Assuming data contains the generated topic ID
      numberOfQuestions: generatedTest.numberOfQuestions,
      positiveMarks: generatedTest.positiveMarks, // Assuming these are static values
      questions: generatedTest.questions, // Assuming data contains the generated questions
      negativeMarks: generatedTest.negativeMarks, // Assuming these are static values
      time: generatedTest.time, // Assuming data contains the generated time
      instructions: generatedTest.instructions
    });
    console.log(generatedTest)
    console.log('Attempting now...');
  };
  const handleCounterOneValueChange = (value) => {
    if (value < remain) {
      setSelectedCounterValue(value);
      setCounterOne(value);
    }

  };
  const handleCounterTwoValueChange = (value) => {
    if (value < remain) {
      setSelectedCounterValue(value);
      setCounterTwo(value);
    }

  };
  const handleAttemptLater = () => {
    // Add logic to navigate to the attempt screen later
    navigation.navigate("Generated Test")
    console.log('Attempting later...');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Counter 1 */}
      <View style={styles.sectionContainer}>

        <Text style={styles.sectionTitle}>Generate Personalized GS Test</Text>
        <View style={styles.buttonContainer}>
          {predefinedCounterValues.map((value) => (
            <TouchableOpacity
              key={value}
              style={[styles.counterBtn, value === counterOne ? styles.selectedButton : null]}
              onPress={() => handleCounterOneValueChange(value)}
            >
              <Text style={[styles.buttonTextCounter, value === counterOne ? styles.selectedButtonText : null]}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.elementContainer}>

          <View style={styles.counter}>
            <TouchableOpacity onPress={decrementCounterOne} style={styles.minusButton}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{counterOne}/{remain}</Text>
            <TouchableOpacity onPress={incrementCounterOne} style={styles.plusButton}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.generateButton} onPress={fetchItem}>
            <Text style={styles.buttonText}>Generate</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Counter 2 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Generate Personalized CSAT Test</Text>
        <View style={styles.buttonContainer}>
          {predefinedCounterValues.map((value) => (
            <TouchableOpacity
              key={value}
              style={[styles.counterBtn, value === counterTwo ? styles.selectedButton : null]}
              onPress={() => handleCounterTwoValueChange(value)}
            >
              <Text style={[styles.buttonTextCounter, value === counterTwo ? styles.selectedButtonText : null]}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.elementContainer}>
          <View style={styles.counter}>
            <TouchableOpacity onPress={decrementCounterTwo} style={styles.minusButton}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{counterTwo}/{remain}</Text>
            <TouchableOpacity onPress={incrementCounterTwo} style={styles.plusButton}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.generateButton} onPress={fetchItem}>
            <Text style={styles.buttonText}>Generate</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Picker 1 */}
      <TouchableOpacity style={styles.getsectionContainer} onPress={() => navigation.navigate("Generated Tests")}>
        <Text style={styles.getsectionTitle}>Click here to get generated tests.</Text>

      </TouchableOpacity>

      {/* Picker 2 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Previous Attempted Question: CSAT</Text>
        <View style={styles.elementContainer}>
          <Picker
            selectedValue={selectedTopic}
            onValueChange={(itemValue) => setSelectedTopic(itemValue)}
            style={styles.dropdown}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="TOPICS" value="" />
            {topics.map((topic, index) => (
              <Picker.Item key={index} label={topic} value={topic} />
            ))}
          </Picker>
          <TouchableOpacity style={styles.fetchButton} >
            <Text style={styles.fetchButtonText}>fetch</Text>
          </TouchableOpacity>
        </View>

      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => {
          setIsModalVisible(!isModalVisible);
        }}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Ionicons name="checkmark-circle-outline" style={styles.successIcon} />
                <Text style={styles.successText}>Test Successfully Generated!</Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.attemptButton} onPress={handleAttemptNow}>
                    <Text style={styles.buttonText}>Attempt Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.attemptButton} onPress={() => {
                    navigation.navigate("Generated Tests")
                    setIsModalVisible(!isModalVisible);
                  }}>
                    <Text style={styles.buttonText}>Attempt Later</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"

  }, successContainer: {
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    height: "30%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  successIcon: {
    color: 'green',
    fontSize: 40,
    marginTop: 20,
  },
  successText: {
    color: 'green',
    fontSize: 18,
    marginTop: 10,
  }, successContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  successIcon: {
    fontSize: 30,
    color: 'green',
    marginRight: 10,
  },
  successText: {
    fontSize: 18,
    color: 'green',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  attemptButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  sectionContainer: {
    marginBottom: 20,

    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,

  },
  getsectionContainer: {
    marginBottom: 20,
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: '#90EE90',
    paddingVertical: 30,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,

  },
  getsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: "#000000"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
    color: "#000000"
  },
  elementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // Additional styling for element container if needed

  },
  pickerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00008b', // Adjust the color to your preference
    textAlign: 'center',
    // Center align the text
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  minusButton: {
    backgroundColor: "red",
    borderRadius: 50, // Make it a circle
    width: 35, // Set width and height to make it a circle
    height: 35,
    marginRight: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  plusButton: {
    backgroundColor: "green",
    borderRadius: 50, // Make it a circle
    width: 35, // Set width and height to make it a circle
    height: 35,
    marginLeft: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  generateButton: {
    backgroundColor: '#0000FF',
    paddingHorizontal: 15,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
  },
  fetchButton: {
    backgroundColor: '#0000FF',
    paddingHorizontal: 25,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 5,
  },
  counterButton: {
    color: "#fff",
    fontSize: 25
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: "center"
  },
  fetchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: "center"
  },
  dropdown: {
    width: '50%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,

    backgroundColor: '#E5E5E5',
    elevation: 5, // Add elevation for shadow effect
  },
  successContainer: {
    alignItems: 'center',
  },
  successIcon: {
    color: 'green',
    fontSize: 40,
    marginTop: 20,
  },
  successText: {
    color: 'green',
    fontSize: 18,
    marginTop: 10,
  },
  counterText: {
    margin: 5,
    color: "#000",
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonTextCounter: {
    color: "black",
    fontWeight: 'bold'
  },
  dropdownCounter: {
    width: '30%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    color: "#000008",
    backgroundColor: '#E5E5E5',
    elevation: 5,
  },
  counterBtn: {
    width: 30,
    height: 30,
    marginRight: 4,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', // Map buttons horizontally
    marginBottom: 4
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  selectedButtonText: {
    color: "#ffffff",
    fontWeight: 'bold'
  }
});

export default GeneratePage;
