// App.js
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createMaterialTopTabNavigator();

const SolutionScreen = ({ route }) => {

  const {
    testId,// Assuming data contains the generated topic ID
    positiveMarks,// Assuming these are static values
    questions,// Assuming data contains the generated questions
    negativeMarks,
    totalMarks,
  } = route.params;
  const [mcqQuestion, setMcqQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const correctQuestions = [];
  const wrongQuestions = [];
  const notAttemptedQuestions = [];

  questions.attempts.forEach(attempt => {
    const questionId = attempt.questionId;

    // Find the corresponding question object from the questions array
    const question = mcqQuestion.find(q => q._id === questionId);

    if (!question) {
      // Question not found, consider it as not attempted
      notAttemptedQuestions.push(questionId);
    } else {
      if (attempt.isSkipped) {
        // Question was skipped
        notAttemptedQuestions.push(questionId);
      } else {
        // Question was attempted
        if (attempt.isCorrect) {
          // Answer was correct
          correctQuestions.push(questionId);
        } else {
          // Answer was incorrect
          wrongQuestions.push(questionId);
        }
      }
    }
  });

  const fetchSpecificQuestions = async (questionIds) => {
    try {
      const response = await fetch('https:d2jju2h99p6xsl.cloudfront.net/api/v1/getmcq');
      const data = await response.json();

      // console.log('API Response:', data);

      if (response.ok) {
        if (Array.isArray(data)) {
          // Filter the MCQs based on the provided object IDs
          const specificQuestions = data.filter(question => questionIds.includes(String(question._id)));

          // Handle the specific MCQs as needed
          console.log('Specific MCQs:', specificQuestions.length);

          // Assuming setMcqQuestion is a state updater function
          setMcqQuestion(specificQuestions);

          // console.log('Specific MCQs:', specificQuestions);
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
    // Extracting the list of object IDs from params
    const questionIds = route.params.questions.attempts.map(attempt => attempt.questionId);

    // Fetch specific MCQs based on the object IDs
    fetchSpecificQuestions(questionIds);

  }, []);

  const [activeFilter, setActiveFilter] = useState('all'); // State variable to manage the active filter
  const [filteredQuestions, setFilteredQuestions] = useState([]); // State variable to store filtered questions

  // Function to filter questions based on the active filter
  const filterQuestions = () => {
    switch (activeFilter) {
      case 'correct':
        return mcqQuestion.filter(question => correctQuestions.includes(question._id));
      case 'wrong':
        return mcqQuestion.filter(question => wrongQuestions.includes(question._id));
      case 'unattempted':
        return mcqQuestion.filter(question => notAttemptedQuestions.includes(question._id));
      default:
        return mcqQuestion;
    }
  };

  // useEffect to update filtered questions when the active filter or questions change
  useEffect(() => {
    setFilteredQuestions(filterQuestions());
  }, [activeFilter, mcqQuestion]);

  // Function to handle filter button press
  const handleFilterPress = (filter) => {
    setActiveFilter(filter);
  };




  console.log("Params received in Solution screen:", route.params);
  if (!mcqQuestion || mcqQuestion.length === 0) {
    return <Text>No questions available</Text>;
  }


  return (

    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'all' && styles.activeFilterButton]}
          onPress={() => handleFilterPress('all')}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'correct' && styles.activeFilterButton]}
          onPress={() => handleFilterPress('correct')}
        >
          <Text style={styles.filterButtonText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'wrong' && styles.activeFilterButton]}
          onPress={() => handleFilterPress('wrong')}
        >
          <Text style={styles.filterButtonText}>Wrong</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'unattempted' && styles.activeFilterButton]}
          onPress={() => handleFilterPress('unattempted')}
        >
          <Text style={styles.filterButtonText}>Unattempted</Text>
        </TouchableOpacity>
      </View>

      <ScrollView >
        {filteredQuestions.map((question, index) => {
          const isCorrect = correctQuestions.includes(question._id);
          const isWrong = wrongQuestions.includes(question._id);
          const selectedOptionIndex = questions.attempts.find(attempt => attempt.questionId === question._id)?.selectedOptionIndex;
          const correctOptionIndex = question.correctOption - 1;

          return (
            <View key={question._id}>
              <View style={styles.questionContainer}>
                <Text style={styles.questionNoText}>Q. {index + 1} </Text>
                <Text style={styles.questionText}>{`${question.question}`}</Text>
                <View style={styles.optionsContainer}>
                  {question.options.map((option, optionIndex) => {
                    const isSelected = optionIndex === selectedOptionIndex;
                    const isCorrectOption = optionIndex === correctOptionIndex;
                    const isWrongOption = isWrong && isSelected;
                    const isUnattempted = !isCorrect && !isWrong && !selectedOptionIndex;

                    let optionBoxStyle = [styles.optionBox];
                    let optionTextStyle = [styles.optionText];

                    if (isSelected) {
                      optionBoxStyle.push(isCorrectOption ? styles.correctSelectedOptionBox : styles.wrongSelectedOptionBox);
                      optionTextStyle.push(isCorrectOption ? styles.correctSelectedOptionText : styles.selectedOptionText);
                    } else if (isCorrectOption && isUnattempted) {
                      // Make correct option green if unattempted
                      optionBoxStyle.push(styles.correctOption);
                    } else if (isWrongOption) {
                      // Make wrong selected option red and correct option green
                      optionBoxStyle.push(styles.wrongSelectedOptionBox);
                      optionTextStyle.push(styles.correctOption);
                    } else if (isCorrectOption && !isUnattempted) {
                      optionBoxStyle.push(styles.correctSelectedOptionBox)
                      optionTextStyle.push(styles.correctSelectedOptionText)
                    }

                    return (
                      <View key={optionIndex} style={optionBoxStyle}>
                        <Text style={styles.optionLabel}>{String.fromCharCode(65 + optionIndex)}.</Text>
                        <Text style={optionTextStyle}>{option}</Text>
                      </View>
                    );
                  })}
                </View>
                <TouchableOpacity onPress={() => { /* Function to view solution */ }}>
                  <Text style={styles.viewSolutionButton}>View Solution</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { /* Function to send for review */ }}>
                  <Text style={styles.sendForReviewButton}>Send for Review</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { /* Function to send for review */ }}>
                  <Text style={styles.sendForReviewButton}>Save Question in Cards</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};


const MarksScreen = ({ navigation, route }) => {
  const {
    testId,// Assuming data contains the generated topic ID
    positiveMarks,// Assuming these are static values
    questions,// Assuming data contains the generated questions
    negativeMarks,
    totalMarks,
  } = route.params ?? {};
  const [mcqQuestion, setMcqQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState([]);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const correctQuestions = [];
  const wrongQuestions = [];
  const notAttemptedQuestions = [];


  const [userid, setUserId] = useState('');
  const [remainingReattempts, setRemainingReattempts] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const _id = await AsyncStorage.getItem('id');
        setUserId(_id);
        console.log("User ID:", _id); // Debugging: Log the retrieved user ID
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchRemainingReattempts = async () => {
      try {
        if (userid && testId) {
          const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/v1/users/test-reattempts/${userid}/${testId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch remaining reattempts');
          }

          const data = await response.json();
          console.log("Remaining Reattempts:", data.testReattempts); // Debugging: Log the fetched remaining reattempts
          setRemainingReattempts(data.testReattempts);
        }
      } catch (error) {
        console.error('Error fetching remaining reattempts:', error.message);
      }
    };

    fetchRemainingReattempts();
  }, [userid, testId]);

  // Rest of the component remains unchanged





  const goToSolution = () => {
    console.log("Navigating to Solution screen...");
    navigation.navigate('Solution', {
      mcqQuestion// Assuming data contains the generated questions
      // Pass selectedOptions to SolutionScreen
    });
  };
  // Set options with setOptions
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={goToSolution}>
          <Text>Go to Solution</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, goToSolution]);


  questions.attempts.forEach(attempt => {
    const questionId = attempt.questionId;

    // Find the corresponding question object from the questions array
    const question = mcqQuestion.find(q => q._id === questionId);

    if (!question) {
      // Question not found, consider it as not attempted
      notAttemptedQuestions.push(questionId);
    } else {
      if (attempt.isSkipped) {
        // Question was skipped
        notAttemptedQuestions.push(questionId);
      } else {
        // Question was attempted
        if (attempt.isCorrect) {
          // Answer was correct
          correctQuestions.push(questionId);
        } else {
          // Answer was incorrect
          wrongQuestions.push(questionId);
        }
      }
    }
  });




  // Rest of your component remains the same
  const fetchSpecificQuestions = async (questionIds) => {
    try {
      const response = await fetch('https://d2jju2h99p6xsl.cloudfront.net/api/v1/getmcq');
      const data = await response.json();

      // console.log('API Response:', data);

      if (response.ok) {
        if (Array.isArray(data)) {
          // Filter the MCQs based on the provided object IDs
          const specificQuestions = data.filter(question => questionIds.includes(String(question._id)));

          // Handle the specific MCQs as needed
          console.log('Specific MCQs:', specificQuestions.length);

          // Assuming setMcqQuestion is a state updater function
          setMcqQuestion(specificQuestions);

          // console.log('Specific MCQs:', specificQuestions);
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
    // Extracting the list of object IDs from params
    const questionIds = route.params.questions.attempts.map(attempt => attempt.questionId);

    // Fetch specific MCQs based on the object IDs
    fetchSpecificQuestions(questionIds);

  }, []);

  // Example of using setOptions to navigate to another screen

  const totalQuestions = mcqQuestion.length; // Assuming total questions in the test
  const totalRank = 500; // Assuming total ranks available
  const marks = totalMarks.toFixed(2);
  const scorePercentage = (totalMarks / (totalQuestions * 2)) * 100;
  const rankPercentage = (totalRank - totalMarks) / totalRank * 100;


  const handleReattempt = async (userId, testId) => {
    if (remainingReattempts > 0) {
      try {
        // Decrement test reattempt count by one
        const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/v1/users/decrement-test-reattempts/${userId}/${testId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to decrement test reattempts');
        }
      } catch (error) {
        console.error('Error decrementing test reattempts:', error.message);
      }
    } else {
      // Optionally, show a message that the user has no remaining reattempts
    }
  };

  // Handle reattempt button press
  const reattempt = async (testId, userId) => {
    try {
      // Fetch test data
      const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/v1/tr/testbytestid/${testId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      // Check if there are remaining attempts
      if (remainingReattempts > 0) {
        // Call handleReattempt if there are remaining attempts
        handleReattempt(userId, testId);
        navigation.navigate('TestOverview', {
          // Pass the fetched data to TestOverview screen
          name: data.name,
          topic: data.topic,
          topicId: data.topicId,
          id: data._id,
          numberOfQuestions: data.numberOfQuestions,
          positiveMarks: data.positiveMarks,
          questions: data.questions,
          negativeMarks: data.negativeMarks,
          time: data.time,
          instructions: data.instructions
        });
      } else {
        openSubscribeModal();// If no remaining attempts, handle accordingly (e.g., show a message)
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
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
                <Text style={styles.modalTitle}>Subscribe to Reattempt Test</Text>
                <Text style={styles.modalDescription}>
                  To re-attempt a test, you need to subscribe to our service. Choose an option below:
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

  return (
    <View style={styles.container}>
      {/* Score Section */}
      <View style={styles.scoreSection}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreTitle}>Your Score</Text>
          <Text style={styles.scoreValue}>{marks}</Text>
          <Text style={styles.scoreOutof}>out of {totalQuestions * 2}</Text>
        </View>
        <View style={styles.scoreBox2}>
          <Text style={styles.scoreTitle}>Your Rank</Text>
          <Text style={styles.scoreValue}>145</Text>
          <Text style={styles.scoreOutof}>out of 345</Text>
        </View>
      </View>

      {/* Reattempt Button */}
      <TouchableOpacity style={styles.reattemptButton} onPress={() => reattempt(testId, userid)}>
        <Text style={styles.reattemptButtonText}>REATTEMPT({remainingReattempts})</Text>
      </TouchableOpacity>
      {/* Question Analysis */}


      <View style={styles.analysisBox}>
        <Text style={styles.analysisTitle}>Question Analysis</Text>
        <View style={styles.circleContainer}>
          {mcqQuestion.map((question, index) => {
            const isCorrect = correctQuestions.includes(question._id);
            const isWrong = wrongQuestions.includes(question._id);
            const isNotAttempted = notAttemptedQuestions.includes(question._id);

            let circleStyle = styles.notAttempted; // Default style for not attempted

            if (isCorrect) {
              circleStyle = styles.correct;
            } else if (isWrong) {
              circleStyle = styles.wrong;
            } else if (isNotAttempted) {
              circleStyle = styles.notAttempted;
            }

            return (
              <View key={index} style={[styles.circle, circleStyle]}>
                <Text style={styles.circleText}>{index + 1}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.textView}>
          <Text style={styles.correctText}>{correctQuestions.length} Correct</Text>
          <Text style={styles.wrongText}>{wrongQuestions.length} Wrong</Text>
          <Text style={styles.notAttemptedText}>
            {notAttemptedQuestions.length} Not Attempted
          </Text>
        </View>
      </View>
      <SubscribeModal />
    </View>

  );
};

const AttemptAnalysis = ({ route, navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Marks"
        component={MarksScreen}
        initialParams={{ ...route.params }}
      />
      <Tab.Screen
        name="Solution"
        component={SolutionScreen}
        initialParams={{ ...route.params }}
      />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgrey',
  },
  rankSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  scoreBox: {
    flex: 1,
    // Width of the left border
    padding: 20,
    alignItems: 'center',
  },
  scoreBox2: {
    flex: 1,
    borderLeftWidth: 2, // Width of the left border
    borderLeftColor: '#00008b',
    padding: 20,
    borderRadius: 7,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#000"
  },
  scoreValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#00008b"
  },
  scoreOutof: {
    fontSize: 15,
    fontWeight: 'bold',

  },
  rankBox: {
    flex: 1,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
  },
  rankTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rankValue: {
    fontSize: 20,
  },
  reattemptButton: {
    backgroundColor: '#00008b',
    width: "50%",
    height: 40,
    paddingTop: 6,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center'
  },
  reattemptButtonText: {
    color: 'white',
    fontSize: 20,

  },
  analysisBox: {
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    alignSelf: "center"
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
    margin: 2,
    marginBottom: 10,
  },
  circleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  correct: {
    backgroundColor: 'green',
  },
  wrong: {
    backgroundColor: 'red',
  },
  notAttempted: {
    backgroundColor: 'grey',
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  correctText: {
    color: 'green'
  },
  wrongText: {
    color: 'red',

  },
  notAttemptedText: {
    color: 'grey',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 5,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    borderTopWidth: 2,
    paddingTop: 10,
    borderRadius: 8,
    color: '#333',
  },
  questionNoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  // optionsContainer: {

  // },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  optionLabel: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498DB',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  correctSelectedOptionBox: {
    backgroundColor: 'lightgreen',
  },
  wrongSelectedOptionBox: {
    backgroundColor: 'red',
  },
  correctOption: {
    backgroundColor: 'lightblue',
  },
  selectedOptionText: {
    marginRight: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  correctSelectedOptionText: {
    marginRight: 8,
    color: 'black',
    fontWeight: 'bold',
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeFilterButton: {
    backgroundColor: '#3498db',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#333',
  },
  viewSolutionButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    elevation: 5,
    borderWidth: 1,
    textAlign: 'center',
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sendForReviewButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
    elevation: 5,
    color: '#00008b',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AttemptAnalysis;