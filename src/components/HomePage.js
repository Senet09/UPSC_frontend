

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, BackHandler, TouchableOpacity, Modal, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Calendar, LocaleConfig } from 'react-native-calendars';
const { height } = Dimensions.get('window');
const subjects = [
  { id: '1', name: 'History', iconName: 'ios-book' },
  { id: '2', name: 'Geography', iconName: 'ios-globe' },
  { id: '3', name: 'Political Science', iconName: 'ios-people' },
  { id: '4', name: 'Economics', iconName: 'ios-cash' },
  // Add more subject entries here
];
const currentAffairsData = [
  { id: '1', title: '12th Dec 2023', date: 'Daily Notes' },

  // Add more current affairs entries here
];
const tests = [
  { id: '1', name: 'UPSC Prelims Test 1' },
  { id: '2', name: 'UPSC Prelims Test 2' },
  // Add more test entries here
];

const question = {
  text: 'Write about the impact of globalization on developing countries.',
  date: '12/10/2023',
};
const latestTests = [
  { id: '1', date: '12/12 #1', subject: 'Geography', numQuestions: 30 },

  // Add more latest test entries here
];
const fakeTestData = {
  testName: 'Sample Test',
  subjectName: 'History',
  numQuestions: 30,
  positiveMarks: 3,
  negativeMarks: 1,
  time: '60 minutes',
  language: 'English',
  instructions:
    'This test consists of multiple-choice questions. Answer all questions. Each correct answer carries 3 marks, and each wrong answer deducts 1 mark.',
};
const HomePage = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const handleTestPress = () => {
    // You can navigate to the test details page when a test is pressed
    navigation.navigate('TestList');
  };


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Make API call to fetch questions
        const response = await fetch('https://d2jju2h99p6xsl.cloudfront.net/api/mains/getmainQuestions');
        const data = await response.json();
        console.log(data)
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionPress = (question) => {
    navigation.navigate('Submissions', { question });
  };




  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (modalVisible) {
        closeModal();
        return true; // Prevent default behavior (exit the app)
      }
      return false;
    });

    return () => backHandler.remove(); // Cleanup the event listener on unmount
  }, [modalVisible]);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleSubjectPress = (subject) => {
    // Handle subject press as needed
    console.log('Pressed on subject:', subject.name);
  };
  const handleAIAnalysis = () => {
    // Handle AI analysis button press here
    // Example: initiate AI analysis functionality
  };
  const handleLeaderboardPress = () => {
    navigation.navigate("Leaderboard")
  }
  const personalizeTest = () => {
    navigation.navigate("Personalize")
  }
  const generateQuestions = () => {

    navigation.navigate("GenerateQuestion")
  }


  const [dailyNotes, setDailyNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("https://d2jju2h99p6xsl.cloudfront.net/api/CAs");
      const data = await response.json();

      setDailyNotes(data.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };
  const userHoursData = {
    '2024-03-01': 2,
    '2024-03-02': 1.5,
    '2024-03-03': 3
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>


        <View style={styles.horizontalContainer}>
          <TouchableOpacity style={styles.persionaliseTest} onPress={personalizeTest}>
            <Image source={require("../../assets/icons/personalization.png")} style={styles.iconImage} />
            <Text style={styles.buttonText}>Personalize Test</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.topicWiseTest} onPress={() => navigation.navigate("GS Test")}>
            <Image source={require("../../assets/icons/checklist.png")} style={styles.iconImage} />
            <Text style={styles.buttonText}>Topic Wise </Text>
          </TouchableOpacity>
        </View>
        {/* Existing code for syllabus tracker, current streak, and other sections */}
        {/* <View style={styles.latestTestHeader}>
            <Text style={styles.latestTestHeaderText}>Persionalise Test</Text>
            <TouchableOpacity style={styles.viewAllButton} onPress={()=>navigation.navigate("GsTest")}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
      <TouchableOpacity style={styles.latestTestContainer}>
         
          {latestTests.map((test) => (
            <TouchableOpacity key={test.id} style={styles.latestTestItem} onPress={()=>navigation.navigate('TestOverview', { ...fakeTestData })}>
              <View style={styles.iconContainer}>
                <Icon name="ios-document" size={24} style={styles.icon1} />
              </View>
              <View style={styles.latestTestDetails}>
                <Text style={styles.latestTestTitle}>{test.date}</Text>
                <Text style={styles.latestTestSubtitle}>{test.subject}</Text>
                <Text style={styles.latestTestSubtitle}>{test.numQuestions} questions</Text>
              </View>
            </TouchableOpacity>
          ))}
        </TouchableOpacity> */}


        <View style={styles.horizontalContainer2}>
          <TouchableOpacity style={styles.aiButton} onPress={handleAIAnalysis}>
            <Image source={require("../../assets/icons/ai.png")} style={styles.iconImage} />
            <Text style={styles.buttonText}>AI analysis</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.performanceContainer}>

            <TouchableOpacity style={styles.performanceInfo} onPress={() => navigation.navigate("Rank")}>
              <Image source={require("../../assets/icons/stats.png")} style={styles.iconImage} />

              <Text style={styles.infoTextLabel}>Rank:75/400</Text>

            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <Text style={styles.streakHeader}>Current Streak</Text>
        <TouchableOpacity style={styles.streakContainer} onPress={openModal}>
          <View style={styles.streakContent}>
            <Text style={styles.streakValue}>15 Days</Text>
            <View style={styles.daysContainer}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayButton,
                    index === 1 || index === 4 ? { borderColor: '#000', borderWidth: 1 } : null, // Highlighting Tuesday and Friday
                  ]}
                >
                  <Text style={styles.dayText}>{day}</Text>
                </TouchableOpacity>
              ))}
            </View>

          </View>
        </TouchableOpacity>
        <Modal visible={modalVisible} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>DAILY TEST STREAK</Text>
                  </View>
                  <TouchableOpacity style={styles.backButton} onPress={closeModal}>
                    <Icon name="close" size={30} />
                  </TouchableOpacity>
                  <View style={styles.modalContentInner}>
                    <View style={styles.goal2Header}>
                      <Icon name="checkmark-circle" size={30} color="#05B40B" style={styles.icon} />
                      <View>
                        <Text style={styles.goal2HeaderText}>GOAL</Text>
                        <Text style={styles.goal3HeaderText}>Attempt at-least 1 test everyday</Text>
                      </View>
                    </View>
                    <View style={styles.streak2Header}>
                      <View style={styles.streak2Header}>
                        <Image source={require("../../assets/icons/fire2.png")} style={styles.streakImage} />
                        <View>
                          <Text style={styles.streak2HeaderText}>4 Days</Text>
                          <Text style={styles.streak3HeaderText}>Current Streak</Text>
                        </View>
                      </View>

                      <View style={styles.streak4Header}>
                        <Image source={require("../../assets/icons/fire.png")} style={styles.streakImage} />
                        <View>
                          <Text style={styles.streak2HeaderText}>6 Days</Text>
                          <Text style={styles.streak3HeaderText}>Longest Streak</Text>
                        </View>
                      </View>
                    </View>

                    <Calendar
                      // Customize the appearance of the calendar
                      style={{ height: 350 }}
                      // Specify the current date
                      current={'2024-03-01'}
                      // Callback that gets called when the user selects a day
                      onDayPress={day => {
                        console.log('selected day', day);
                      }}
                      // Mark specific dates as marked
                      markedDates={{
                        '2024-03-01': {
                          selected: true,
                          marked: true,
                          selectedColor: 'blue',
                          customStyles: {
                            container: {
                              backgroundColor: 'lightgray',
                            },
                            text: {
                              color: 'black',
                            },
                          },
                          hoursSpent: userHoursData['2024-03-01']
                        },
                        '2024-03-02': {
                          marked: true,
                          customStyles: {
                            container: {
                              backgroundColor: 'lightgray',
                            },
                            text: {
                              color: 'black',
                            },
                          },
                          hoursSpent: userHoursData['2024-03-02']
                        },
                        '2024-03-03': {
                          selected: true,
                          marked: true,
                          selectedColor: 'blue',
                          customStyles: {
                            container: {
                              backgroundColor: 'lightgray',
                            },
                            text: {
                              color: 'black',
                            },
                          },
                          hoursSpent: userHoursData['2024-03-03']
                        }

                      }}
                      // Custom render method for day component
                      dayComponent={({ date, state }) => {
                        const hoursSpent = userHoursData[date.dateString];
                        return (
                          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>
                              {date.day}
                            </Text>
                            {hoursSpent && (
                              <Text style={{ fontSize: 10, color: 'blue' }}>
                                {hoursSpent} hrs
                              </Text>
                            )}
                          </View>
                        );
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        closeModal();
                        navigation.navigate("Time Spent");
                      }}
                      style={styles.button2}
                    >
                      <Text style={styles.buttonText2}>Time Spent on Subject</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shareButton}>
                      <Text style={styles.shareButtonText}>SHARE YOUR STREAK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <TouchableOpacity style={styles.leaderboardButton} onPress={handleLeaderboardPress}>
          <View style={styles.leaderboardIconContainer}>
            <Image source={require("../../assets/icons/podium.png")} style={styles.leaderboardIcon} />
          </View>
          <View style={styles.userLeaderboardInfo}>
            <Text style={styles.leaderboardHeaderText}>Leaderboard</Text>
            {/* Replace with user leaderboard information */}
            <Text style={styles.userRank}>Rank: #5</Text>
            <Text style={styles.userName}>Username: JohnDoe123</Text>
            {/* Add other user leaderboard information */}
          </View>
        </TouchableOpacity>

        <View style={styles.mainsQuestionContainer}>
          <Text style={styles.mainsQuestionHeading}>Mains Questions</Text>
          <TouchableOpacity style={styles.viewAllButton} onPress={generateQuestions}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.sampleQuestionContainer} onPress={() => handleQuestionPress(questions[questions.length - 1])}>
          {questions.length > 0 && (
            <>
              <Text style={styles.sampleQuestionText}>{questions[questions.length - 1].question}</Text>
              <Text style={styles.sampleQuestionDate}>{formatDate(questions[questions.length - 1].createdAt)}</Text>
            </>
          )}
        </TouchableOpacity>


        {/* Rest of your content */}


        <View style={styles.currentAffairsContainer} >
          <Text style={styles.currentAffairsHeading}>Current Affairs</Text>
          <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate("Learn")} >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {dailyNotes.length > 0 && (
          <TouchableOpacity
            key={dailyNotes[dailyNotes.length - 1]._id}
            style={styles.currentAffairsItem}
            onPress={() => navigation.navigate("CaNoteDetails", { note: dailyNotes[dailyNotes.length - 1] })}
          >
            <Icon name="book-outline" size={24} style={styles.icon1} />
            <View style={styles.currentAffairsContent}>
              <Text style={styles.currentAffairsTitle}>{dailyNotes[dailyNotes.length - 1].title}</Text>
              <Text style={styles.currentAffairsDate}>{formatDate(dailyNotes[dailyNotes.length - 1].createdAt)}</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.imageContainer} >
          <Image
            source={require('../../assets/image/poster.jpg')} // Replace with your image path
            style={styles.image}
          />
        </TouchableOpacity>

        <View style={styles.contactContainer}>
          <Text style={styles.contactHeading}>Contact Us</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon}>
              <Icon name="logo-instagram" size={40} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Icon name="logo-youtube" size={40} color="#db4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Icon name="logo-twitter" size={40} color="#00acee" />
            </TouchableOpacity>
          </View>
        </View>

      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    borderTopColor: "#000",
    borderTopWidth: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 8,
  },
  streak2Header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginLeft: 2
  },
  streak4Header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginLeft: 5
  },
  goal2Header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 15

  },
  goal3HeaderText: {
    color: "#000"
  },
  streak3HeaderText: {
    color: "#000"
  },
  streak2HeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  streakImage: {

    height: 30,
    marginLeft: 5,
    marginRight: 10,
    width: 30
  },
  icon: {
    marginRight: 10,
  },
  goal2HeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  headerContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: "#f0f0f0",
    marginBottom: 20,
    borderWidth: 2
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginTop: 15
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
    borderColor: "#f0f0f0",
    borderWidth: 2,
    marginBottom: 20,
  },
  streakHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#000',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10, // Adjust as needed
  },
  streakContent: {
    flexDirection: 'column',
    alignItems: "flex-start",
  },
  streakValue: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 20,
    color: '#ff8635',
  },
  daysContainer: {
    flexDirection: 'row',
    marginTop: 15
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
    marginVertical: 20,
    horizontalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      // Additional styles as needed
    },
  },
  mainsQuestionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAllButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: "#00d56d",
    alignContent: "flex-end",
    borderWidth: 2,
    borderRadius: 8,
  },
  viewAllText: {
    color: '#00d56d',
    fontWeight: 'bold',
  },
  sampleQuestionContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderWidth: 2,
    borderLeftWidth: 7,
    borderLeftColor: "#00008b",

    borderRadius: 8,
    marginBottom: 20,
  },
  sampleQuestionText: {
    fontSize: 18,
    marginBottom: 8,
    color: "#000"
  },
  sampleQuestionDate: {
    fontSize: 14,
    color: '#000',
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
    borderWidth: 2,
    borderColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  icon1: {
    marginRight: 10,
    color: '#00008d',
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
    borderWidth: 2,
    borderColor: "#f0f0f0"
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
  topicWiseTest: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    height: 100,
    width: 150,
    flexDirection: 'column',

    justifyContent: 'center',

  },
  performanceContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "#000",
    height: 100,
    width: 150,
    paddingHorizontal: 20,
  },
  performanceHeaderText: {
    fontSize: 20,
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  infoTextLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold'
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
  persionaliseTest: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    height: 100,
    width: 200,
    flexDirection: 'column',

    justifyContent: 'center',
  },
  aiButton: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    height: 100,
    width: 150,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  iconImage: {


    height: 60,
    width: 60
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: "#000",
    paddingBottom: 20,
    borderBottomWidth: 2,
    marginBottom: 20
    // Additional styles as needed
  },
  horizontalContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: "#000",
    paddingBottom: 20,
    borderBottomWidth: 2,
    paddingHorizontal: 20,
    // Additional styles as needed
  },
  leaderboardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    marginVertical: 10,
  },
  leaderboardIconContainer: {

    padding: 10,
    borderRadius: 50,
    marginRight: 15,
  },
  leaderboardIcon: {
    width: 50,
    height: 50,

  },
  userLeaderboardInfo: {
    flex: 1,
  },
  leaderboardHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  userRank: {
    fontSize: 16,
    color: '#333',
  },
  userName: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },


  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    // Ensure rounded corners are applied
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 10,
    fontSize: 18,
  },
  modalHeaderText: {
    fontSize: 16,
    marginTop: 19,
    fontWeight: 'bold',
    color: '#000',
  },
  modalContentInner: {
    padding: 20,

  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderWidth: 1,

    borderColor: "#fff"

  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 3
  },
  goalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  streakText: {
    fontSize: 16,
    marginBottom: 20,
  },
  shareButton: {
    borderColor: "#0000FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
    marginTop: 40
  },
  shareButtonText: {
    color: '#0000FF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button2: {
    backgroundColor: '#6200ee', // Customize as needed
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Other styles remain unchanged
});

export default HomePage;
