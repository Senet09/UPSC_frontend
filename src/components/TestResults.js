import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const TestResults = () => {
    const testHistoryData = [
        {
          id:"1",
          testName: 'Planets & Space #2',
          date: '2023-11-01',
          marks: 85,
          totalMarks: 100,
        },
        {
          id:"2",
          testName: 'Planets & Space #2',
          date: '2023-11-05',
          marks: 70,
          totalMarks: 100,
        },
        {
          id:"3",
          testName: '10/11 #1',
          date: '2023-12-03',
          marks: 92,
          totalMarks: 100,
        },
        {
          id:"4",
          testName: '10/11 #2',
          date: '2023-12-10',
          marks: 78,
          totalMarks: 100,
        },
        {
          id:"5",
          testName: '10/11 #3',
          date: '2023-12-15',
          marks: 88,
          totalMarks: 100,
        },
      ];
      

  const renderTestItem = ({ item }) => (
    <View style={styles.testItem}>
      <View style={styles.testInfo}>
        <Text style={styles.testName}>{item.testName}</Text>
        <Text>{`Attempted on: ${item.date}`}</Text>
      </View>
      <View style={styles.testScore}>
        <Text style={styles.testName}>{`${item.marks}/${item.totalMarks}`}</Text>
      </View>
    </View>
  );

 

  return (
    <View style={styles.container}>
      <FlatList
        data={testHistoryData}
        keyExtractor={(item) => item.id}
        renderItem={renderTestItem}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  testItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  testInfo: {
    flex: 2,
  },
  testName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"#000"
  },
  testScore: {
    flex: 1,
    alignItems: 'flex-end',
   
  },

});

export default TestResults;