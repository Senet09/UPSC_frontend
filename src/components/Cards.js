import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Cards = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    fetchUserId();
  }, []);

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

  const saveNote = async () => {
    try {
      // Check if any input field is empty
      if (!userId || !question || !answer || !tag) {
        alert('Please fill in all fields');
        return;
      }

      const response = await fetch('https://d2jju2h99p6xsl.cloudfront.net/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          question,
          answer,
          tag,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save card');
      }

      // Clear input fields
      setQuestion('');
      setAnswer('');
      setTag('');
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </Pressable>
        <Text style={styles.headerText}>Add Cards</Text>
      </View>
      <Text style={styles.label}>Tag:</Text>
      <TextInput
        style={styles.input}
        value={tag}
        onChangeText={(text) => setTag(text)}
        placeholder="e.g., History, War, WWII"
        color="black"
        fontWeight="bold"
      />
      <Text style={styles.label}>Question:</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={question}
        onChangeText={(text) => setQuestion(text)}
        placeholder="e.g., What year did World War II start?"
        multiline={true}
        color="black"
        fontWeight="bold"
      />
      <Text style={styles.label}>Answer:</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={answer}
        onChangeText={(text) => setAnswer(text)}
        placeholder="e.g., World War II started in 1939."
        multiline={true}
        color="black"
        fontWeight="bold"
      />
      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          { backgroundColor: pressed ? '#4CAF50' : '#00008b' },
        ]}
        onPress={saveNote}
      >
        <Text style={styles.buttonText}>Save Card</Text>
      </Pressable>
      <View style={styles.centeredText}>
        <Text style={styles.bottomText}>Add Important facts that you want to</Text>
        <Text style={styles.bottomText}>revise and memorize by heart</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderColor: '#00008b',
    borderTopWidth: 2,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#00008b',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 40,
  },
  centeredText: {
    alignItems: 'center',
    marginTop: 70
  },
  bottomText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default Cards;
