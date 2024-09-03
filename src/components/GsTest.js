import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const subjects = [
  { id: '1', name: 'Ancient Indian History', iconName: require('../../assets/icons/harappa.png') },
  { id: '2', name: 'Medieval Indian History', iconName: require('../../assets/icons/taj-mahal.png') },
  { id: '3', name: 'Modern Indian History', iconName: require('../../assets/icons/gandhi.png') },
  { id: '4', name: 'Art and Culture', iconName: require('../../assets/icons/painting.png') },
  { id: '5', name: 'Polity', iconName: require('../../assets/icons/ashoka-chakra.png') },
  { id: '6', name: 'ECONOMY', iconName: require('../../assets/icons/ruppe.png') },
  { id: '7', name: 'Environment', iconName: require('../../assets/icons/tree.png') },
  { id: '8', name: 'Geography', iconName: require('../../assets/icons/planet-earth.png') },
  { id: '9', name: 'Science and Tech', iconName: require('../../assets/icons/innovation.png') },
  // Add more subject entries here
];
const currentAffairsData = [
  { id: '1', title: 'Title 1', date: 'November 20, 2023' },
  { id: '2', title: 'Title 2', date: 'November 18, 2023' },
  // Add more current affairs entries here
];
const sampleQuestion = {
  question: 'Sample Question: Write about the impact of globalization on developing countries.',
  date: 'November 25, 2023',
};
const latestTests = [
  { id: '1', date: 'November 28, 2023', subject: 'Geography', numQuestions: 30 },
  { id: '2', date: 'November 25, 2023', subject: 'History', numQuestions: 40 },
  // Add more latest test entries here
];

const GsTest = ({ navigation }) => {
  const handleTestPress = (id) => {
    // You can navigate to the test details page when a test is pressed
    navigation.navigate('Test', { id });
  };

  const handleSubjectPress = (subject) => {
    // Handle subject press as needed
    console.log('Pressed on subject:', subject.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("Generate")}>
          <Icon name="add-circle-sharp" size={35} style={styles.icon2} />
          <Text style={styles.listItemText}>Generate Test</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("Topic-Wise Test Generated")}>
          <Icon name="construct" size={35} style={styles.icon2} />
          <Text style={styles.listItemText}>Generated Test</Text>
        </TouchableOpacity>
     
        {subjects.map((subject) => (
          <TouchableOpacity key={subject.id} style={styles.listItem} onPress={() => handleTestPress(subject.id)}>
            <View style={styles.iconContainer}>
              <Image source={subject.iconName} style={styles.icon1} />
            </View>
            <Text style={styles.listItemText}>{subject.name}</Text>
          </TouchableOpacity>
        ))}

       
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  FlatList: {
    flex: 1,
    backgroundColor: '#ffffff',
   
  },
  headerContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor:"#f0f0f0",
    marginBottom: 20,
    borderWidth:2
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  trackerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  streakContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderColor:"#f0f0f0",
    borderWidth:2,
    marginBottom: 20,
  },
  streakHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  streakContent: {
    flexDirection: 'column',
    alignItems: "flex-start",
  },
  streakValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20,
    color: '#000',
  },
  daysContainer: {
    flexDirection: 'row',
    marginTop:15
  },
  dayButton: {
    borderRadius: 50,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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
    alignItems: 'center',
  },
  iconContainer: {
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
  },
  icon: {
    color: '#00008d',
  },
  listItemText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '400',
  },

  mainsQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
 
  },
  mainsQuestionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAllButton: {
    backgroundColor: '#00008d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewAllText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sampleQuestionContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderWidth:2,
    borderColor:"#f0f0f0",
    borderRadius: 8,
    marginBottom: 20,
  },
  sampleQuestionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  sampleQuestionDate: {
    fontSize: 14,
    color: '#888',
  },
  currentAffairsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  currentAffairsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  currentAffairsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth:2,
    borderColor:"#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  icon1: {
    marginRight: 10,
    height:35,
    width:35
  },
  currentAffairsContent: {
    flex: 1,
  },
  currentAffairsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  currentAffairsDate: {
    fontSize: 12,
    color: '#333',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  contactContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth:2,
    borderColor:"#f0f0f0"
  },
  contactHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    padding: 10,
  },

  performanceContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth:2,
    borderColor:"#f0f0f0",
    marginBottom: 20,
  },
  performanceHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
   
  },
  viewButton: {
    backgroundColor: '#00008d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  performanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  infoTextLabel: {
    fontSize: 16,
    color: '#333',
  },
  infoValueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
    fontSize: 24,
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
  icon2:{
    color:"#00008b",
    marginRight: 10,
    height:35,
    width:35
  }
});

export default GsTest;
