import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PreviousCards = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCardsByUserId();
    }
  }, [userId]);

  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('id');
      if (storedUserId !== null) {
        setUserId(storedUserId);
      }
    } catch (error) {
      console.error('Error fetching userId:', error);
    }
  };

  const fetchCardsByUserId = async () => {
    try {
      const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/cards/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cards');
      }
      const data = await response.json();
      const filteredQuestions = data.filter(question => question.isRevised === undefined || question.isRevised === false);
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };


  const showAnswer = () => {
    setIsFlipped(true);
  };

  const handleEasyClick = async () => {
    await updateCard(false);
    moveNext();
  };

  const handleHardClick = async () => {
    await updateCard(true);
    moveNext();
  };

  const updateCard = async (isHard) => {
    try {
      const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/cards/${questions[currentIndex]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isRevised: true, isHard })
      });
      if (!response.ok) {
        throw new Error('Failed to update card');
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const moveNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false); // Reset flip state
    } else {
      navigation.navigate("TabNavigator");
    }
  };

  return (
    <View style={styles.container}>




      <View style={styles.cardContainer}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>
            {currentIndex + 1}/{questions.length}   Tag: {questions[currentIndex] ? questions[currentIndex].tag : ''}
          </Text>
          <Text style={styles.tagText}>
            Level: 1
          </Text>
        </View>
        <FlipCard
          flipHorizontal={true}
          flipVertical={false}
          friction={6}
          perspective={1000}
          flip={isFlipped}
          onFlipEnd={() => console.log('Flip ended')}
        >

          <View style={styles.card}>
            <Text style={styles.questionText}>
              {questions[currentIndex] ? questions[currentIndex].question : ''}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.answerText}>
              {questions[currentIndex] ? questions[currentIndex].answer : ''}
            </Text>
          </View>
        </FlipCard>
      </View>

      {isFlipped && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleEasyClick} style={styles.buttonEasy}>
            <Text style={styles.buttonText}>EASY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHardClick} style={styles.buttonHard}>
            <Text style={styles.buttonText}>HARD</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isFlipped && (
        <TouchableOpacity onPress={showAnswer} style={styles.showAnswer}>
          <Text style={styles.showAnswerText}>
            Show Answer
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  tagText: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "bold",
    color: "#000000"
  },
  cardContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderTopColor: "#00008b",
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 16,
    color: "#000000"
  },
  answerText: {
    fontSize: 18,
    color: "#000000"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  buttonHard: {
    backgroundColor: '#f62380',

    alignItems: 'center',
    flex: 1,
    justifyContent: "space-evenly",
    height: 70,
  },
  buttonEasy: {
    backgroundColor: '#02ba4f',
    alignItems: 'center',
    flex: 1,
    justifyContent: "space-evenly",
    height: 70,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  showAnswer: {
    width: "100%",
    backgroundColor: "#00008b",
    height: 70,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  showAnswerText: {
    fontSize: 18,
    alignSelf: "center",
    color: 'white',
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default PreviousCards;
