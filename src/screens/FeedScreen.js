import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomePage from '../components/HomePage';
import { QuestionListPage } from '../components/MainsQuestion';

const YourMainScreen = () => {
  return (
    <View style={styles.container}>
      {/* You can use the GsTest component here */}
      <HomePage />
      
      {/* You can use the QuestionListPage component here */}
      <QuestionListPage />

      {/* You can use the SubmissionPage component here */}
      {/* For now, I'm passing a hardcoded question as a prop */}
      <SubmissionPage route={{ params: { question: 'How does React Native work?' } }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default YourMainScreen;
