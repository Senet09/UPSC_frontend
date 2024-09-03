import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'; // Assuming you have a library that provides Header and Icon components
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from './Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopicWiseAttemptedTestList from './TopicWiseAttemptedTest';
const Tab = createMaterialTopTabNavigator();

const UnAttemptedTestList = () => {
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
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userId = await AsyncStorage.getItem('id')
      // Replace 'url-to-your-endpoint' with the actual URL or endpoint
      const response = await fetch('https://d2jju2h99p6xsl.cloudfront.net/api/get-topic-unattempted-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the request headers
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      // Update the state with the fetched data
      setFakeTestData(data);

    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(fakeTestData);
  }, [fakeTestData]);

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();

    // The empty dependency array ensures that this effect runs once after the initial render
  }, []);


  const handleItemClick = (item) => {
    // Navigate to the TestPage passing the selected test data
    navigation.navigate('TestPage', { test: item });
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
    return option ? option.label : 'Unknown';
  }




  const handleAttemptNow = (index) => {
    const topic = getLabelForValue(fakeTestData[index].topicId)
    // Add logic to navigate to the attempt screen immediately
    navigation.navigate('TestOverview', {
      name: fakeTestData[index].name,
      topic: topic,
      topicId: fakeTestData[index].topicId,
      id: fakeTestData[index]._id,// Assuming data contains the generated topic ID
      numberOfQuestions: fakeTestData[index].numberOfQuestions,
      positiveMarks: fakeTestData[index].positiveMarks, // Assuming these are static values
      questions: fakeTestData[index].questions, // Assuming data contains the generated questions
      negativeMarks: fakeTestData[index].negativeMarks, // Assuming these are static values
      time: fakeTestData[index].time, // Assuming data contains the generated time
      instructions: fakeTestData[index].instructions
    });
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Loader />
      ) : fakeTestData.length === 0 ? (

        <View style={styles.noTestContainer}>

          <Text style={styles.noTestText}>No Available Test.</Text>
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("Generate")}>
            <Icon name="add-circle-sharp" size={35} style={styles.icon2} />
            <Text style={styles.listItemText}>Generate it now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.latestTestContainer}>
          {fakeTestData.reverse().map((test, index) => (
            <TouchableOpacity key={test._id} style={styles.latestTestItem} onPress={() => handleAttemptNow(index)}>
              <View >
                <Icon name="bookmark" size={24} style={styles.icon1} />
              </View>
              <View style={styles.latestTestDetails}>
                <Text style={styles.latestTestTitle}>{getLabelForValue(test.topicId)} </Text>
                <Text style={styles.latestTestSubtitle}>{formatDate(test.createdAt)} | {test.numberOfQuestions} questions</Text>
                <Text style={styles.latestTestSubtitle}>{test.numberOfQuestions * 2} marks | {getLabelForValue(test.topicId)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};


const TopicTestList = ({ route, navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Available Test"
        component={UnAttemptedTestList}
      />
      <Tab.Screen
        name="Attempted Test"
        component={TopicWiseAttemptedTestList}
      />
    </Tab.Navigator>
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
  noTestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTestText: {
    fontSize: 18,
    color: 'red',
    marginVertical: 10,
    fontWeight: 'bold'
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    width: "95%",
    alignItems: 'center',
  }, listItemText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '400',
  }, icon2: {
    color: "#00008b",
    marginRight: 10,
    height: 35,
    width: 35
  },
});

export default TopicTestList;
