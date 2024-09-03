// import React from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import SearchBarTab from '../components/SearchBar';
// // import {
// //   Container,
// //   Card,
// //   UserInfo,
// //   UserImgWrapper,
// //   UserImg,
// //   UserInfoText,
// //   UserName,
// //   PostTime,
// //   MessageText,
// //   TextSection,
// // } from '../styles/MessageStyles';

// const Messages = [
//   {
//     id: '1',
//     userName: 'Jenny Doe',
//     userImg: require('senet/assets/users/user-1.jpg'),
//     messageTime: '4 mins ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '2',
//     userName: 'John Doe',
//     userImg: require('senet/assets/users/user-2.jpg'),
//     messageTime: '2 hours ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '3',
//     userName: 'Ken William',
//     userImg: require('senet/assets/users/user-3.jpg'),
//     messageTime: '1 hours ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '4',
//     userName: 'Selina Paul',
//     userImg: require('senet/assets/users/user-4.jpg'),
//     messageTime: '1 day ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '5',
//     userName: 'Christy Alex',
//     userImg: require('senet/assets/users/user-5.jpg'),
//     messageTime: '2 days ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
// ];

// const MessagesScreen = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//       <SearchBarTab />
//       <FlatList
//         data={Messages}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() =>
//               navigation.navigate('ChatScreen', {userName: item.userName})
//             }>
//             <View style={styles.UserInfo}>
//               <View style={styles.UserImgWrapper}>
//                 <Image style={styles.UserImg} source={item.userImg} />
//               </View>
//               <View style={styles.TextSection}>
//                 <View style={styles.UserInfoText}>
//                   <Text style={styles.UserName}>{item.userName}</Text>
//                   <Text style={styles.PostTime}>{item.messageTime}</Text>
//                 </View>
//                 <Text style={styles.MessageText}>{item.messageText}</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// export default MessagesScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   card: {width: '100%'},
//   UserInfo: {flexDirection: 'row', justifyContent: 'space-between'},
//   UserImgWrapper: {paddingTop: 15, paddingBottom: 15},
//   UserImg: {width: 50, height: 50, borderRadius: 25},
//   TextSection: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//     padding: 15,
//     paddingLeft: 0,
//     marginLeft: 10,
//     width: 300,
//     borderBottomWidth: 1,
//     borderBottomColor: '#cccccc',
//   },
//   UserInfoText: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   UserName: {fontSize: 14, fontWeight: 'bold', fontFamily: 'Lato-Regular'},
//   PostTime: {fontSize: 12, color: '#666', fontFamily: 'Lato-Regular'},
//   MessageText: {fontSize: 14, color: '#333333'},
// });

// // export const Container = styled.View`
// //   flex: 1;
// //   padding-left: 20px;
// //   padding-right: 20px;
// //   align-items: center;
// //   background-color: #ffffff;
// // `;

// // export const Card = styled.TouchableOpacity`
// //   width: 100%;
// // `;

// // export const UserInfo = styled.View`
// //   flex-direction: row;
// //   justify-content: space-between;
// // `;

// // export const UserImgWrapper = styled.View`
// //   padding-top: 15px;
// //   padding-bottom: 15px;
// // `;

// // export const UserImg = styled.Image`
// //   width: 50px;
// //   height: 50px;
// //   border-radius: 25px;
// // `;

// // export const TextSection = styled.View`
// //   flex-direction: column;
// //   justify-content: center;
// //   padding: 15px;
// //   padding-left: 0;
// //   margin-left: 10px;
// //   width: 300px;
// //   border-bottom-width: 1px;
// //   border-bottom-color: #cccccc;
// // `;

// // export const UserInfoText = styled.View`
// //   flex-direction: row;
// //   justify-content: space-between;
// //   margin-bottom: 5px;
// // `;

// // export const UserName = styled.Text`
// //   font-size: 14px;
// //   font-weight: bold;
// //   font-family: 'Lato-Regular';
// // `;

// // export const PostTime = styled.Text`
// //   font-size: 12px;
// //   color: #666;
// //   font-family: 'Lato-Regular';
// // `;

// // export const MessageText = styled.Text`
// //   font-size: 14px;
// //   color: #333333;
// // `;


// import * as React from "react";
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import Ionicons from "react-native-vector-icons/Ionicons";
// // Sample data for messages (Replace this with actual user data)
// const sampleMessages = [
//   { id: 1, sender: "John Doe", text: "Hey, how are you doing?", time: "2h ago" },
//   { id: 2, sender: "Jane Smith", text: "Check out this cool post!", time: "1d ago" },
//   // Add more messages here
// ];

// // Sample data for user images (Replace this with actual user images)
// const userImages = {
//   "John Doe": require("senet/assets/users/user-1.jpg"),
//   "Jane Smith": require("senet/assets/users/user-2.jpg"),
//   // Add more user images here
// };

// const Tab = createMaterialTopTabNavigator();

// // Render individual message item
// const renderItem = ({ item,navigation }) => {
 
//   return (
//     <TouchableOpacity style={styles.messageContainer}>
//       <Image style={styles.avatar} source={userImages[item.sender]} />
//       <View style={styles.messageContent}>
//         <Text style={styles.sender}>{item.sender}</Text>
//         <Text style={styles.text}>{item.text}</Text>
//         <Text style={styles.time}>{item.time}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const MessagesScreen = ({navigation}) => {
 
//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitle: (props) => (
//         <Text
//           {...props}
//           style={{
//             color: 'black',
//             fontSize: 20,
//             fontFamily: 'layfairDisplay-SemiBold',
//             fontWeight: 'bold',
//           }}>
//           SENET
//         </Text>
//       ),
//       headerStyle: {
//         backgroundColor: '#ffffff', //Set Header color
//       },
//       headerRight: () => (
//         <Ionicons
//           name="chatbox-outline"
//           size={30}
//           color="black"
//           style={{ marginRight: 10 }}
//           onPress={() => navigation.navigate('MessagesScreen')}
//         />
//       ),
//     });
//   }, [navigation]);
//   return (
//     <View style={styles.container}>
//       <Tab.Navigator>
//         <Tab.Screen name="Focused" component={FocusedMessagesScreen} />
//         <Tab.Screen name="Other" component={OtherMessagesScreen} />
//       </Tab.Navigator>
//     </View>
//   );
// };

// const FocusedMessagesScreen = () => {
//   const focusedMessages = sampleMessages.filter((message) => message.sender === "John Doe");
//   return (
//     <FlatList
//       data={focusedMessages}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={renderItem} /* Use the renderItem function here */
//       contentContainerStyle={styles.listContainer}
//       ItemSeparatorComponent={() => <View style={styles.separator} />}
//     />
//   )
// };

// const OtherMessagesScreen = () => {
//   const otherMessages = sampleMessages.filter((message) => message.sender !== "John Doe");
//   return (
//     <FlatList
//       data={otherMessages}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={renderItem} 
//       contentContainerStyle={styles.listContainer}
//       ItemSeparatorComponent={() => <View style={styles.separator} />}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   listContainer: {
//     paddingHorizontal: 16,
//   },
//   messageContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 12,
//   },
//   messageContent: {
//     flex: 1,
//   },
//   sender: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333333",
//   },
//   text: {
//     fontSize: 14,
//     color: "#666666",
//   },
//   time: {
//     fontSize: 12,
//     color: "#999999",
//     marginTop: 4,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: "#EFEFEF",
//   },
// })

// export default MessagesScreen;


// import React from 'react';

// import {
//   View,
//   Text,
//   SafeAreaView,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   Image,
// } from 'react-native';
// import CommunityList from '../components/CommunityList';
// import PostUpload from '../components/PostUpload';
// import Problem from '../components/Problem';
// import Discussions from '../components/Discussions';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const Tab = createMaterialTopTabNavigator();

// const sampleMessages = [
//   { id: 1, sender: "John Doe", text: "Hey, how are you doing?", time: "2h ago" },
//   { id: 2, sender: "Jane Smith", text: "Check out this cool post!", time: "1d ago" },
//   // Add more messages here
// ];

// // Sample data for user images (Replace this with actual user images)
// const userImages = {
//   "John Doe": require("senet/assets/users/user-1.jpg"),
//   "Jane Smith": require("senet/assets/users/user-2.jpg"),
//   // Add more user images here
// };

// const renderItem = ({ item,navigation }) => {
 
//   return (
//     <TouchableOpacity style={styles.messageContainer}>
//       <Image style={styles.avatar} source={userImages[item.sender]} />
//       <View style={styles.messageContent}>
//         <Text style={styles.sender}>{item.sender}</Text>
//         <Text style={styles.text}>{item.text}</Text>
//         <Text style={styles.time}>{item.time}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };


// const FocusedMessagesScreen = () => {
//   const focusedMessages = sampleMessages.filter((message) => message.sender === "John Doe");
//   return (
//     <FlatList
//       data={focusedMessages}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={renderItem} /* Use the renderItem function here */
//       contentContainerStyle={styles.listContainer}
//       ItemSeparatorComponent={() => <View style={styles.separator} />}
//     />
//   )
// };

// const OtherMessagesScreen = () => {
//   const otherMessages = sampleMessages.filter((message) => message.sender !== "John Doe");
//   return (
//     <FlatList
//       data={otherMessages}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={renderItem} 
//       contentContainerStyle={styles.listContainer}
//       ItemSeparatorComponent={() => <View style={styles.separator} />}
//     />
//   );
// };



// const MessagesScreen = ({navigation}) => {


//   return (
//     <Tab.Navigator>
//       <Tab.Screen 
//       name="Focused"
//       options={{
//         tabBarLabel: 'FOCUSED',
//         tabBarLabelStyle: styles.tabLabel,
//       }}
//       component={FocusedMessagesScreen} />
//       <Tab.Screen
//        name="OTHERS" 
//        options={{
//         tabBarLabel: 'OTHERS',
//         tabBarLabelStyle: styles.tabLabel,
//       }}
//        component={OtherMessagesScreen} />
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   tabLabel: {
//     fontFamily: 'Roboto',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   listContainer: {
//     paddingHorizontal: 16,
//   },
//   messageContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 12,
//   },
//   messageContent: {
//     flex: 1,
//   },
//   sender: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333333",
//   },
//   text: {
//     fontSize: 14,
//     color: "#666666",
//   },
//   time: {
//     fontSize: 12,
//     color: "#999999",
//     marginTop: 4,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: "#EFEFEF",
//   },
// });

// export default MessagesScreen;


import * as React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

// Sample data for messages (Replace this with actual user data)
const sampleMessages = [
  { id: 1, sender: "John Doe", text: "Hey, how are you doing?", time: "2h ago" },
  { id: 2, sender: "Jane Smith", text: "Check out this cool post!", time: "1d ago" },
  // Add more messages here
];

// Sample data for user images (Replace this with actual user images)
const userImages = {
  "John Doe": require("senet/assets/users/user-1.jpg"),
  "Jane Smith": require("senet/assets/users/user-2.jpg"),
  // Add more user images here
};

const Tab = createMaterialTopTabNavigator();

// Render individual message item
const renderItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.messageContainer}>
      <Image style={styles.avatar} source={userImages[item.sender]} />
      <View style={styles.messageContent}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MessagesScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: (props) => (
        <Text
          {...props}
          style={{
            color: 'black',
            fontSize: 20,
            fontFamily: 'PlayfairDisplay-SemiBold',
            fontWeight: 'bold',
          }}>
          Inbox
        </Text>
      ),
      headerStyle: {
        backgroundColor: '#ffffff', // Set Header color
      },
      headerLeft: () => (
        <Ionicons
          name="chevron-back-outline"
          size={24}
          color="black"
          style={{ marginLeft: 10 }}
          onPress={() => navigation.navigate('Feed')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Focused" component={FocusedMessagesScreen} />
        <Tab.Screen name="Other" component={OtherMessagesScreen} />
      </Tab.Navigator>
    </View>
  );
};

const FocusedMessagesScreen = () => {
  const focusedMessages = sampleMessages.filter((message) => message.sender === "John Doe");
  return (
    <FlatList
      data={focusedMessages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem} 
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const OtherMessagesScreen = () => {
  const otherMessages = sampleMessages.filter((message) => message.sender !== "John Doe");
  return (
    <FlatList
      data={otherMessages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem} 
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  sender: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  text: {
    fontSize: 14,
    color: "#666666",
  },
  time: {
    fontSize: 12,
    color: "#999999",
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#EFEFEF",
  },
});

export default MessagesScreen;
