import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView, // Import ScrollView
} from 'react-native';
import { Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const latestTests = [{ id: '1', date: '12/12 #1', subject: 'Geography', numQuestions: 30 }];
const PersonaliseTestList = () => {
  const navigation = useNavigation();
  const [fakeTestData, setFakeTestData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://d2jju2h99p6xsl.cloudfront.net/api/v1/tr/get-test');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setFakeTestData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemClick = (item) => {
    navigation.navigate('TestPage', { test: item });
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Header
        leftComponent={{ icon: 'arrow-back', color: '#000', onPress: () => navigation.goBack() }}
        centerComponent={{ text: 'Test List', style: { color: '#000', fontSize: 18 } }}
        containerStyle={{
          backgroundColor: '#ffffff',
          justifyContent: 'space-around',
          height: 80,
          color: '#000',
        }}
      /> */}
      <TouchableOpacity style={styles.latestTestContainer}>
        {fakeTestData.map((test, index) => (
          <TouchableOpacity
            key={test._id}
            style={styles.latestTestItem}
            onPress={() => navigation.navigate('TestOverview', { ...fakeTestData[index] })}
          >
            <View>
              <Icon name="airplane-sharp" size={24} style={styles.icon1} />
            </View>
            <View style={styles.latestTestDetails}>
              <Text style={styles.latestTestTitle}>{test.createdAt}</Text>
              <Text style={styles.latestTestSubtitle}>{test.name}</Text>
              <Text style={styles.latestTestSubtitle}>{test.numberOfQuestions} questions</Text>
            </View>
          </TouchableOpacity>
        ))}
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
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

export default PersonaliseTestList;
