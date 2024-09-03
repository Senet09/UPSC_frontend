import React, { useState, useEffect, useRef, useId } from 'react';
import { Modal, Button, View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Alert, SafeAreaView, } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontFamily, FontSize, Color, Padding, Border } from "../styles/GlobalStyles";
import Loader from './Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Test = ({ route, navigation }) => {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});// 10 minutes in seconds
  const [timerActive, setTimerActive] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [notAttemptedQuestions, setNotAttemptedQuestions] = useState([]);
  const [lastTenPercent, setLastTenPercent] = useState(false);
  const {
    name,
    topic,
    id,
    numberOfQuestions,
    positiveMarks,
    mcqQuestion,
    topicId,
    negativeMarks,
    time,
  } = route.params;
  const [timeRemaining, setTimeRemaining] = useState(time * 60);
  const [userid, setUserId] = useState('');

  useEffect(() => {
    // Function to fetch user data from AsyncStorage
    const fetchUserData = async () => {
      try {
        const _id = await AsyncStorage.getItem('id')

        setUserId(_id);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call the function to fetch user data
    fetchUserData();
  }, []);


  const scrollViewRef = useRef(null);
  const fetchMcqs = async () => {
    try {
      const response = await fetch('https://d2jju2h99p6xsl.cloudfront.net/api/v1/getmcq');
      const data = await response.json();

      //console.log('API Response:', data); // Log the response data

      if (response.ok) {
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          console.error('Invalid response format - expected an array:', data);
        }
      } else {
        console.error('Error fetching MCQs:', data.message || response.statusText);
      }
    } catch (error) {
      console.error('Error fetching MCQs:', error.message);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Fetch data or perform any other actions when the screen comes into focus
      fetchMcqs();
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0 && timerActive) {
        setTimeRemaining(prevTime => {
          // Check if the time remaining is in the last 10%
          if (prevTime <= time * 6 && !lastTenPercent) {
            setLastTenPercent(true); // Set the lastTenPercent state to true
          }
          return prevTime - 1;
        });
      } else {
        setTimerActive(false);
        clearInterval(timer);
        if (!timerActive) {
          handleSubmitTest(); // Call handleSubmitTest when time ends
        }
        // Handle timer expiration here
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, timerActive]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (

        <Text style={[styles.timerText, lastTenPercent && styles.redText]}>
          {`${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`}
        </Text>
      ),
      headerTitle: () => (
        <Icon name="close" size={30} onPress={handleEndTest} />
      ),
    });
  }, [navigation, timeRemaining, lastTenPercent]);

  useEffect(() => {
    const attemptedQuestionIds = selectedOptions.map((item) => item.questionId);
    const notAttemptedQuestions = mcqQuestion
      .filter((question) => !attemptedQuestionIds.includes(question._id))
      .map((question) => question._id);

    setNotAttemptedQuestions(notAttemptedQuestions);
  }, [selectedOptions, mcqQuestion]);

  const handleOptionSelect = (questionId, optionIndex) => {
    // Check if the option is already selected
    const isOptionAlreadySelected = selectedOptions.some(item => item.questionId === questionId && item.optionIndex === optionIndex);

    if (isOptionAlreadySelected) {
      // If the option is already selected, remove it from the selected options
      setSelectedOptions(prevSelectedOptions => prevSelectedOptions.filter(item => !(item.questionId === questionId && item.optionIndex === optionIndex)));
    } else {
      // If the option is not selected, first deselect any previously selected option for the same question
      const updatedSelectedOptions = selectedOptions.filter(item => item.questionId !== questionId);
      // Then add the newly selected option
      setSelectedOptions([...updatedSelectedOptions, { questionId, optionIndex }]);
    }
  };



  const scrollToNextQuestion = () => {
    // Find the index of the next question
    const currentQuestionIndex = mcqQuestion.findIndex(
      (question) => question._id === selectedOptions[selectedOptions.length - 1]?.questionId
    );

    // If there is a next question, scroll to it
    if (currentQuestionIndex < mcqQuestion.length - 1) {
      const nextQuestion = mcqQuestion[currentQuestionIndex + 1];
      scrollViewRef.current.scrollTo({
        x: 0,
        y: nextQuestion.offsetTop, // Add a property 'offsetTop' to each question when rendering
        animated: true,
      });
    }
  };
  const handleCheckboxSelect = (questionId, optionIndex, checkboxIndex) => {
    const updatedSelectedCheckboxes = { ...selectedCheckboxes };
    const optionKey = `${questionId}_${optionIndex}`;
    const checkboxValue = updatedSelectedCheckboxes[optionKey] || [];
    checkboxValue[checkboxIndex] = !checkboxValue[checkboxIndex];
    updatedSelectedCheckboxes[optionKey] = checkboxValue;
    setSelectedCheckboxes(updatedSelectedCheckboxes);
  };

  const isOptionSelected = (questionId, optionIndex) => {
    return selectedOptions.some(
      (item) => item.questionId === questionId && item.optionIndex === optionIndex
    );
  };

  const isCheckboxSelected = (questionId, optionIndex, checkboxIndex) => {
    const optionKey = `${questionId}_${optionIndex}`;
    const checkboxValue = selectedCheckboxes[optionKey] || [];
    return checkboxValue[checkboxIndex];
  };
  const [isMenuModalVisible, setMenuModalVisible] = useState(false);

  const openMenuModal = () => {
    setMenuModalVisible(true);
  };

  const closeMenuModal = () => {
    setMenuModalVisible(false);
  };

  const renderAttemptedQuestions = () => {
    return (
      <View>
        <View style={styles.circleContainer}>
          {mcqQuestion.map((question, index) => {
            const isAttempted = selectedOptions.some((item) => item.questionId === question._id);
            return (
              <View
                key={index}
                style={[
                  styles.circle,
                  isAttempted && styles.attemptedCircle,
                ]}
              >
                <Text style={styles.circleText}>{index + 1}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const getOptionLabel = (index) => {
    return String.fromCharCode(65 + index); // Adjust index to start from 'A'
  };


  const handleEndTest = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to end the test?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setTimerActive(false);
            navigation.navigate('TabNavigator'); // Replace 'TestList' with your actual test list page
          },
        },
      ],
      { cancelable: true }
    );
  };


  const mcq = mcqQuestion;
  const handleSubmitTest = async () => {
    try {
      // Calculate the test result
      let totalMarks = 0;
      const correctQuestions = [];
      const wrongQuestions = [];

      selectedOptions.forEach(({ questionId, optionIndex }) => {
        const question = questions.find((q) => q._id === questionId);
        if (question) {
          if (question.correctOption === optionIndex + 1) {
            // Correct option selected, add 2 marks
            totalMarks += 2;
            correctQuestions.push(question._id);
          } else {
            // Wrong option selected, subtract 1 mark
            totalMarks -= 0.66;
            wrongQuestions.push(question._id);
          }
        } else {
          // Question not found, considered as not attempted
          notAttemptedQuestions.push(questionId);
        }
      });
      console.log(selectedOptions)
      // Send the test data to the backend
      const response = await fetch('https://d2jju2h99p6xsl.cloudfront.net/api/submit-attempt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userid, // Assuming you have the user ID available
          testId: id, // Provide the test ID or any other identifier for the test
          answers: selectedOptions,
          topicId: topicId
        }),
      });

      const data = await response.json();
      console.log(userid)
      console.log(id)
      if (response.ok) {
        console.log('Test data submitted successfully:', data);
        // Navigate to the result screen or perform any other actions
        navigation.replace("Test Analysis", {
          mcq,
          totalMarks,
          correctQuestions,
          wrongQuestions,
          selectedOptions,
          notAttemptedQuestions,
        });
      } else {
        console.error('Error submitting test fdata:', data.message || response.statusText);
        // Handle error scenario, show error message to the user or retry
      }
    } catch (error) {
      console.error('Error submitting test data:', error.message);
      // Handle error scenario, show error message to the user or retry
    }
  };


  const closeModal = () => {
    // Close the modal

    setModalVisible(false);
    navigation.navigate("TabNavigator")

  };
  const formatQuestionText = (text) => {
    // Check if question text contains question marks or newline characters
    const hasQuestionMarks = text.includes('?');
    const hasNewline = text.includes('\n');

    // If question text has question marks or newline characters, add line breaks
    if (hasQuestionMarks || hasNewline) {
      // Split the text into lines
      const lines = text.split(/(\?|\n)/);
      // Map through lines and add line breaks if necessary
      return lines.map((line, index) => (
        <Text key={index} style={styles.questionText}>
          {line.trim()}
        </Text>
      ));
    } else {
      // If no question marks or newline characters, return the text without modification
      return <Text style={styles.questionText}>{text}</Text>;
    }
  };


  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.testDetails}>
          <Text style={styles.detailText}>Number of Questions:{numberOfQuestions} </Text>
          <Text style={styles.detailText}>Total Marks: {numberOfQuestions * 2}</Text>
          {/* Add more details here */}
        </View>
        <TouchableOpacity onPress={openMenuModal}>
          <Icon name="menu" size={40} style={styles.drawerIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>


        {mcqQuestion.map((question, questionIndex) => (
          <View
            key={question._id}
            style={[
              styles.questionContainer,
              questionIndex > 0 && styles.questionGap,
            ]}
          >
            <Text style={styles.questionNumberText}>{`Q.${questionIndex + 1}`}</Text>
            <Text style={styles.questionText}>{`${question.question.trim()}`}</Text>

            {question.options.map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <TouchableOpacity
                  style={[
                    styles.optionInnerContainer,
                    isOptionSelected(question._id, index) && styles.selectedOption,
                  ]}
                  onPress={() => handleOptionSelect(question._id, index)}
                >
                  <Text style={styles.optionLabel}>{getOptionLabel(index)}</Text>
                  <Text style={styles.optionText}>{option}</Text>

                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}

        {loading ? (
          <Loader />
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitTest}>
            <Text style={styles.submitButtonText}>Submit Test</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.resultText}>Test Result: {testResult}</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuModalVisible}
        onRequestClose={closeMenuModal}
      >
        <TouchableWithoutFeedback onPress={closeMenuModal}>
          <View style={styles.menuModalContainer}>
            <View style={styles.menuModalContent}>
              <ScrollView>{renderAttemptedQuestions()}</ScrollView>

            </View>
            <Icon name="close" size={24} onPress={closeMenuModal} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,



  },
  subHeader: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderWidth: 1,
    borderTopColor: "#000",
    marginBottom: 10,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ffffff',
  },
  menuModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  attemptedCircle: {
    backgroundColor: '#27ae60', // Green color for attempted questions
  },
  circleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuModalContent: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  menuModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionContainer: {
    marginBottom: 16,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: FontFamily.gilroySemibold,
    color: '#333',
  },
  questionGap: {
    marginTop: 16,
  },

  questionNumberText: {
    fontSize: 18,
    fontWeight: 'bold',

    color: '#00008b',
    paddingBottom: 5,
    borderBottomWidth: 4,
    borderRadius: 7,
    borderColor: '#00008b'
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 10,
    width: '100%',
    borderRadius: 10,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    elevation: 1,
  },
  selectedOption: {
    backgroundColor: "lightblue",
    height: 100
    // Background color for the entire option container
  },
  optionLabel: {
    marginRight: 8,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#3498DB',
    borderWidth: 1,
    borderColor: '#3498DB',
    borderRadius: 50,
    width: 25,
    height: 25,
    textAlign: 'center',
    lineHeight: 25,
  },
  optionInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    marginLeft: 10,
  },
  separator: {
    height: 4,
    backgroundColor: '#dddddd',
    marginVertical: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,

  },
  checkbox: {
    marginVertical: -10,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 6
  },
  redText: {
    color: 'red',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  drawerIcon: {
    marginLeft: 10,
    color: '#000',
  },
  testDetails: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000',
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#00008b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: 380
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: "center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
});



export default Test;
