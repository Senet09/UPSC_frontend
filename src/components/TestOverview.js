import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Loader from './Loader';
const TestOverview = ({ route, navigation, index }) => {
  // Sample data received from the previous screen or context
  const [mcqQuestion, setMcqQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    name,
    topic,
    id,
    topicId,
    numberOfQuestions,
    positiveMarks,
    questions,
    negativeMarks,
    time,
    instructions,
  } = route.params;


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
          console.log(id)
          // Assuming setMcqQuestion is a state updater function
          setMcqQuestion(specificQuestions);
          console.log(questionIds.length)
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
    const questionIds = route.params.questions.map(question => question);

    // Fetch specific MCQs based on the object IDs
    fetchSpecificQuestions(questionIds);

  }, []);



  const handleStartTest = () => {

    navigation.navigate('TestPage', { mcqQuestion, id, negativeMarks, positiveMarks, time, numberOfQuestions, topic, name, topicId });
  };
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.testName}>{name}</Text>
        <Text style={styles.subjectName}>{topic}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Number of Questions: {numberOfQuestions}</Text>
        <Text style={styles.infoText}>Positive Marks: {positiveMarks}</Text>
        <Text style={styles.infoText}>Negative Marks: {negativeMarks}</Text>
        <Text style={styles.infoText}>Time: {time}</Text>

      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsHeader}>Instructions:</Text>
        <Text style={styles.instructionsText}>{instructions}</Text>
      </View>


      {loading ? (
        <Loader />
      ) : (
        <TouchableOpacity onPress={handleStartTest} style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Test</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  header: {
    marginBottom: 20,
  },
  testName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subjectName: {
    fontSize: 24,
    color: '#333',
  },
  info: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
  },
  instructions: {
    marginBottom: 20,
  },
  instructionsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  instructionsText: {
    fontSize: 20,
    color: '#000',
  },
  startButton: {
    backgroundColor: '#00008d',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default TestOverview;
