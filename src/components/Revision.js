import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import NoCardNotification from './NoCardNotification';

const RevisionPage = ({ navigation }) => {
  const [cardCount, setCardCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userId, setUserId] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [revisedCard, setRevisedCard] = useState(0);
  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCardsByUserId();
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if (navigation.isFocused()) {
        fetchUserId();
      }
    }, [navigation])
  );

  useFocusEffect(
    useCallback(() => {
      if (userId && navigation.isFocused()) {
        fetchCardsByUserId();
      }
    }, [userId, navigation])
  );

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
      setCardCount(filteredQuestions.length);
      setQuestions(filteredQuestions);
      setRevisedCard(data)
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const startRevision = () => {
    if (cardCount > 0) {
      navigation.navigate('PreviousCards');
    } else {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const closeNotification = () => {
    setShowNotification(false); // Close the notification
  };

  const addNote = () => {
    navigation.navigate('Cards');
  };

  const handleRefresh = () => {
    fetchCardsByUserId();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBox1} onPress={() => navigation.navigate("Cards List", { isRevised: false })}>
          <Text style={styles.headerTitle}>DUE TODAY</Text>
          <Text style={styles.headerNumber}>{cardCount} Cards</Text>
          <Text style={styles.headerSubtitle}>Revision due</Text>
          <Text style={styles.headerSubtitle}>today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBox} onPress={() => navigation.navigate("Cards List", { isRevised: true })}>
          <Text style={styles.headerTitle}>REVISED</Text>
          <Text style={styles.headerNumber}>{revisedCard.length - cardCount} Cards</Text>
          <Text style={styles.headerSubtitle}>Revision due</Text>
          <Text style={styles.headerSubtitle}>in future</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.RevisionPage}>
        <Text style={styles.heading}>CARDS FOR REVISION</Text>
        <View style={styles.cardCountContainer}>
          <Text style={styles.cardCountText}>{questions.length}</Text>
        </View>

        <Pressable style={styles.button} onPress={startRevision}>
          <Text style={styles.buttonText}>START REVISION</Text>
        </Pressable>
      </View>
      <FloatingAction
        actions={[
          {
            name: 'addNote',
            text: 'Add Card',
            position: 1,
            icon: (
              <Icon
                name="add"
                color="white"
                size={20}
              />
            ),
          },
        ]}
        overrideWithAction
        color="#000099"
        onPressItem={() => addNote()}
      />
      {showNotification && <NoCardNotification onClose={closeNotification} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    alignItems: 'center',
  },
  header: {
    width: "100%",

    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerBox: {
    alignItems: 'center',
    flex: 1,

  },
  headerBox1: {
    alignItems: 'center',
    flex: 1,
    borderRightWidth: 0.2,

  },
  headerTitle: {
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
    fontWeight: 'bold',
  },
  headerNumber: {
    fontSize: 20,
    marginBottom: 10,
    color: "#00008b",
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: "#000000",
    fontSize: 12,
  },
  heading: {
    fontSize: 24,
    color: "#000",
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#000099',
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 18,
  },
  cardCountContainer: {
    borderWidth: 4,
    borderColor: '#000099',
    borderRadius: 100,
    padding: 10,
    width: 150,
    height: 150,
  },
  cardCountText: {
    fontSize: 30,
    alignSelf: "center",
    paddingTop: 40,
  },
  RevisionPage: {
    width: "100%",
    marginTop: 50,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 0.5,
    paddingVertical: 10,
    alignItems: "center"
  }
});

export default RevisionPage;
