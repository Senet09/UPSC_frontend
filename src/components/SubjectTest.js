import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const subjects = [
  { id: '1', name: 'History', iconName: 'ios-book' },
  { id: '2', name: 'Geography', iconName: 'ios-globe' },
  { id: '3', name: 'Political Science', iconName: 'ios-people' },
  { id: '4', name: 'Economics', iconName: 'ios-cash' },
  // Add more subject entries here
];

const SubjectList = ({ navigation }) => {
  const handleSubjectPress = (subject) => {
    // You can navigate to a subject details page when a subject is pressed
    navigation.navigate('SubjectDetails', { subject });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Subjects</Text>
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSubjectPress(item)} style={styles.subjectItem}>
            <View style={styles.iconContainer}>
              <Icon name={item.iconName} size={24} style={styles.icon} />
            </View>
            <Text style={styles.subjectItemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subjectItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  iconContainer: {
    borderColor: '#307ecc',
    borderWidth: 1,
    borderRadius: 50, // To make it a circle
    padding: 10,
    marginRight: 12,
  },
  icon: {
    color: '#307ecc',
  },
  subjectItemText: {
    fontSize: 18,
  },
});

export default SubjectList;
