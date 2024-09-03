import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import withAuth from '../authentication/withAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const GenerateTopic = ({ route }) => {
  const navigation = useNavigation();

  const { id } = route.params

  const [topicId, setTopicId] = useState('');
  const [testGeneratedSuccessfully, setTestGeneratedSuccessfully] = useState(false);
  const [email, setEmail] = useState("utkarsh@gmail.com");
  const [name, setName] = useState("Generated Topic Wise Test")
  const [generatedTest, setGeneratedTest] = useState([]);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const predefinedCounterValues = [30, 50, 70, 80, 100];
  const [selectedCounterValue, setSelectedCounterValue] = useState('');
  // const [userId, setUserId] = useState('');

  // useEffect(() => {
  //   // Function to fetch user data from AsyncStorage
  //   const fetchUserData = async () => {
  //     try {
  //       const userId = await AsyncStorage.getItem('id');

  //       setUserId(userId);

  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   // Call the function to fetch user data
  //   fetchUserData();
  // }, []);

  const [userProfile, setUserProfile] = useState(null);
  const [remain, setRemain] = useState(null);
  const [counterOne, setCounterOne] = useState(20);




  useEffect(() => {
    if (remain !== null) {
      if (remain > 20) {
        setCounterOne(20);
      } else {
        setCounterOne(remain);
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
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const placeholderOptions = [
    { id: "1", label: 'Ancient Indian History', value: 1 },
    { id: "2", label: 'Medieval Indian History', value: 2 },
    { id: "3", label: 'Modern Indian History', value: 3 },
    { id: "4", label: 'Art and Culture', value: 4 },
    { id: "5", label: 'Polity', value: 5 },
    { id: "6", label: 'Economy', value: 6 },
    { id: "7", label: 'Environment', value: 7 },
    { id: "8", label: 'Geography', value: 8 },
    { id: "9", label: 'Science and Tech', value: 9 }
  ];
  const topicIdtoLabel = [
    { label: 'Ancient Indian History', value: "1" },
    { label: 'Medieval Indian History', value: "2" },
    { label: 'Modern Indian History', value: "3" },
    { label: 'Art and Culture', value: "4" },
    { label: 'Polity', value: "5" },
    { label: 'Economy', value: "6" },
    { label: 'Environment', value: "7" },
    { label: 'Geography', value: "8" },
    { label: 'Science and Tech', value: "9" }
  ];
  const incrementCounter = () => {
    if (counterOne < remain) {
      setCounterOne(counterOne + 1);
    }

  };

  const decrementCounter = () => {
    if (counterOne > 10) {
      setCounterOne(counterOne - 1);
    }
  };

  const idint = parseInt(route.params.id)
  const selectedTopicId = topicId || route.params.id;
  const fetchItem = async () => {
    if (remain === 0) {
      openSubscribeModal();
      return;
    }



    // Add logic to fetch items based on selected values from your backend
    try {
      const userId = await AsyncStorage.getItem('id');
      const response = await fetch('https://d2jju2h99p6xsl.cloudfront.net/tr/api/generate-topic-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          topicId: selectedTopicId,
          userId,
          numberOfQuestions: counterOne,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedTest(data);
        console.log(data)
        setTestGeneratedSuccessfully(true);
      } else {
        console.error('Failed to fetch test data');
        setTestGeneratedSuccessfully(false);
      }
    } catch (error) {
      console.error('Error fetching test data:', error);
    }
  };

  function getLabelForValue(value) {
    const option = topicIdtoLabel.find(option => option.value === value);
    return option ? option.label : 'Unknown';
  }

  const handleAttemptNow = () => {
    const topic = getLabelForValue(generatedTest.test.topicId)
    // Add logic to navigate to the attempt screen immediately
    navigation.navigate('TestOverview', {
      name,
      topic: generatedTest.test.name,
      id: generatedTest.test._id,
      topicId: generatedTest.test.topicId, // Assuming data contains the generated topic ID
      numberOfQuestions: generatedTest.test.numberOfQuestions,
      positiveMarks: generatedTest.test.positiveMarks, // Assuming these are static values
      questions: generatedTest.test.questions, // Assuming data contains the generated questions
      negativeMarks: generatedTest.test.negativeMarks, // Assuming these are static values
      time: generatedTest.test.time, // Assuming data contains the generated time
      instructions: generatedTest.test.instructions
    });
    console.log(generatedTest)
    console.log('Attempting now...');
  };

  const handleAttemptLater = () => {
    // Add logic to navigate to the attempt screen later
    navigation.navigate("Test", { id })
    console.log('Attempting later...');
  };
  const openSubscribeModal = () => {
    setShowSubscribeModal(true);
  };

  const closeSubscribeModal = () => {
    setShowSubscribeModal(false);
  };

  const handleSubscribeNow = () => {
    // Handle subscription now
    closeSubscribeModal();
  };

  const handleSubscribeLater = () => {
    // Handle subscription later
    closeSubscribeModal();
  };

  const SubscribeModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSubscribeModal}
        onRequestClose={closeSubscribeModal}
      >
        <TouchableWithoutFeedback onPress={closeSubscribeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Subscribe to Generate Test</Text>
                <Text style={styles.modalDescription}>
                  To generate a test, you need to subscribe to our service. Choose an option below:
                </Text>
                <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribeNow}>
                  <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribeLater}>
                  <Text style={styles.subscribeButtonText}>Subscribe Later</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };


  const handleCounterOneValueChange = (value) => {
    if (value < remain) {
      setSelectedCounterValue(value);
      setCounterOne(value);
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Generate Here</Text>
        <View style={styles.elementContainer}>
          <Picker
            selectedValue={idint || topicId}
            onValueChange={(itemValue) => setTopicId(itemValue)}
            style={styles.dropdown}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Topics" value="" />

            {placeholderOptions.map((option, index) => (

              <Picker.Item key={index} label={option.label} value={option.value} />

            ))}
          </Picker>
          <View style={styles.counterContainer}>
            <View style={styles.counterContainer2}>
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
            <View style={styles.counterContainer2}>
              <TouchableOpacity onPress={decrementCounter} style={styles.counterButton}>
                <Ionicons name="remove" style={styles.counterIcon} />
              </TouchableOpacity>
              <Text style={styles.counterText}>{counterOne} / {remain} </Text>
              <TouchableOpacity onPress={incrementCounter} style={styles.counterButton}>
                <Ionicons name="add" style={styles.counterIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.generateButton} onPress={fetchItem}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
      </View>
      {testGeneratedSuccessfully && (
        <View style={styles.successContainer}>
          <View style={styles.successContainer}>
            <Ionicons name="checkmark-circle-outline" style={styles.successIcon} />
            <Text style={styles.successText}>Test Successfully Generated!</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.attemptButton} onPress={handleAttemptNow}>
              <Text style={styles.buttonText}>Attempt Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.attemptButton} onPress={handleAttemptLater}>
              <Text style={styles.buttonText}>Attempt Later</Text>
            </TouchableOpacity>
          </View>
        </View>

      )}

      <SubscribeModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  sectionContainer: {

    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  elementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  pickerItem: {
    fontSize: 16,
    color: '#000000',
  },
  dropdown: {
    flex: 1,
    marginRight: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  counterContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  counterContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  counterButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 5,
  },
  counterIcon: {
    fontSize: 20,
    color: '#fff',
  },
  counterText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#333',
  },
  generateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 50,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  successContainer: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  subscribeButton: {
    backgroundColor: 'yellow',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  subscribeButtonText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
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

export default withAuth(GenerateTopic);
