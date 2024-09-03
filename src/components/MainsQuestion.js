import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AttemptedMains from './AttemptedMains';
import UnAttemptedMains from './UnAttemptedMains';
const Tab = createMaterialTopTabNavigator();
const MainsQuestionList = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Attempted" component={AttemptedMains} />
      <Tab.Screen name="Unattempted" component={UnAttemptedMains} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedFilterButton: {
    backgroundColor: 'lightblue',
  },
  questionItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: "#00008b",
    marginBottom: 20,
    padding: 20,
  },
  questionText: {
    color: "#000",
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionDetails: {
    flexDirection: 'column',
  },
  questionDetailsText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  filterButtonText: {
    color: "#000000"
  }
});

export default MainsQuestionList;
