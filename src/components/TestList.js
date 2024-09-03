import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements'; // Assuming you have a library that provides Header and Icon components
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from './Loader';


const TestList = () => {
  const navigation = useNavigation();
  const [fakeTestData, setFakeTestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      // Replace 'url-to-your-endpoint' with the actual URL or endpoint
      const response = await fetch('https://d2jju2h99p6xsl.cloudfront.net/api/v1/tr/get-test');

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


  return (
    <ScrollView style={styles.container}>
      <Header
        leftComponent={{ icon: 'arrow-back', color: '#000', onPress: () => navigation.goBack() }}
        centerComponent={{ text: 'Test List', style: { color: '#000', fontSize: 18 } }}
        containerStyle={{
          backgroundColor: '#ffffff',
          justifyContent: 'space-around',
          height: 80,
          color: '#000'
        }}
      />
      {loading ? (
        <Loader />
      ) : (
        <TouchableOpacity style={styles.latestTestContainer}>
          {fakeTestData.map((test, index) => (
            <TouchableOpacity key={test._id} style={styles.latestTestItem} onPress={() => navigation.navigate('TestOverview', { ...fakeTestData[index] })}>
              <View >
                <Icon name="bookmark" size={24} style={styles.icon1} />
              </View>
              <View style={styles.latestTestDetails}>
                <Text style={styles.latestTestTitle}>GS {index + 1}</Text>
                <Text style={styles.latestTestSubtitle}>{formatDate(test.createdAt)} | {test.numberOfQuestions} questions</Text>
                <Text style={styles.latestTestSubtitle}>{test.numberOfQuestions * 2} marks</Text>
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
});

export default TestList;