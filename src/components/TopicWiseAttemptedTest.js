import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements'; // Assuming you have a library that provides Header and Icon components
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from './Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TopicWiseAttemptedTestList = () => {


  const placeholderOptions = [
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

  const navigation = useNavigation();
  const [fakeTestData, setFakeTestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const fetchData = async () => {
    try {
      // Replace 'url-to-your-endpoint' with the actual URL or endpoint
      const token = await AsyncStorage.getItem('authToken');
      const userId = await AsyncStorage.getItem('id')
      // Make an HTTP GET request to the '/profile' route on your server
      const response = await fetch('https://d2jju2h99p6xsl.cloudfront.net/api/get-attempted-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the request headers
        },
        body: JSON.stringify({
          userId
        }),
      });

      if (!response.ok) {
        setErrorMessage('Failed to fetch data. Please try again later.');
        return;
      }

      const data = await response.json();

      const filteredData = data.filter(test => {
        const topicId = parseInt(test.topicId);
        return topicId >= 1 && topicId <= 20;
      });
      // Update the state with the fetched data

      setFakeTestData(filteredData);
      console.log(fakeTestData)
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();

    // The empty dependency array ensures that this effect runs once after the initial render
  }, []);
  useEffect(() => {
    console.log(fakeTestData[1]);
  }, [fakeTestData]);

  const handleAttemptNow = (index) => {
    // const topic=getLabelForValue(fakeTestData[index].topicId)
    // Add logic to navigate to the attempt screen immediately
    navigation.navigate('Attempt Analysis', {
      testId: fakeTestData[index].testId,// Assuming data contains the generated topic ID
      positiveMarks: fakeTestData[index].positiveMarks, // Assuming these are static values
      questions: fakeTestData[index], // Assuming data contains the generated questions
      negativeMarks: fakeTestData[index].negativeMarks,
      totalMarks: fakeTestData[index].totalMarks
      // Assuming these are static values
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };
  function getLabelForValue(value) {
    const option = placeholderOptions.find(option => option.value === value);
    return option ? option.label : 'Personalize';
  }


  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Loader />
      ) : fakeTestData.length === 0 ? (
        <Text style={styles.noTestMessage}>You have not attempted any test</Text>
      ) : (
        <TouchableOpacity style={styles.latestTestContainer}>
          {fakeTestData.reverse().map((test, index) => (
            <TouchableOpacity key={test._id} style={styles.latestTestItem} onPress={() => handleAttemptNow(index)}>
              <View >
                <Icon name="bookmark" size={24} style={styles.icon1} />
              </View>
              <View style={styles.latestTestDetails}>
                <Text style={styles.latestTestTitle}>{getLabelForValue(test.topicId)} </Text>
                <Text style={styles.latestTestSubtitle}>{formatDate(test.createdAt)} | {test.attempts.length} questions</Text>
                <Text style={styles.latestTestSubtitle}>{test.attempts.length * 2} marks</Text>
              </View>
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  testItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  testIcon: {
    marginRight: 20,
  },
  testDetails: {
    flex: 1,
  },
  testTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  testSubtitle: {
    fontSize: 16,
    color: 'gray',
  },
  serialNumber: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  testLanguage: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 6,
    marginTop: 10,
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  ribbonText: {
    color: 'blue',
    fontSize: 14,
  },
  latestTestContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 20,
  },
  latestTestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  latestTestHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  latestTestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  latestTestDetails: {
    flex: 1,
  },
  latestTestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  latestTestSubtitle: {
    fontSize: 14,
    color: '#333',
  },
  icon1: {
    marginRight: 10,
    color: '#00008d',
  },
  noTestMessage: {
    alignSelf: 'center',
    color: "red",
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default TopicWiseAttemptedTestList;
