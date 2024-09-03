// import React from 'react';
// import {
//   Text,
//   Image,
//   View,
//   StyleSheet,
//   FlatList,
//   Pressable,
//   ScrollView,
//   SafeAreaView,
//   TouchableOpacity,
// } from 'react-native';
// import {Avatar} from 'react-native-paper';
// import Feed from './FeedScreen';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// const DATA = [
//   {
//     id: 1,
//     name: 'John Doe',
//     postTitle: 'President',
//     avatarURI:
//       'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//     imageURI: 'https://images.wsj.net/im-587905/?width=860&size=1.5',
//     randomText: 'I have uploaded my first content on senet ',
//   },
//   {
//     id: 2,
//     name: 'John Doe',
//     postTitle: 'President',
//     avatarURI:
//       'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//     imageURI: 'https://images.wsj.net/im-587905/?width=860&size=1.5',
//     randomText: 'I have uploaded my first content on senet ',
//   },
//   {
//     id: 3,
//     name: 'Jeus Troy',
//     postTitle: 'Prime Minister',
//     avatarURI:
//       'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//     imageURI:
//       'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_400/https://www.eastasiaforum.org/wp-content/uploads/2022/08/2022-06-09T104359Z_646144941_MT1SIPA000FI29QE_RTRMADP_3_SIPA-USA-400x241.jpg',
//     randomText: 'This is the second post',
//   },
// ];
// const ProfileScreen = ({navigation}) => {
//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitle: 'John Doe',
//       headerRight: props => (
//         <Ionicons
//           name="md-cog-outline"
//           size={30}
//           color="#fff"
//           style={{marginLeft: 10}}
//           onPress={() => navigation.navigate('SettingsScreen')}
//         />
//       ),
//       headerStyle: {
//         backgroundColor: '#1A5DB4', //Set Header color
//       },
//     });
//   }, [navigation]);

//   const renderItem = ({item, index}) => {
//     return (
//       <View style={styles.card}>
//         <View style={styles.verticleView}>
//           <TouchableOpacity
//           //onPress={() => navigation.navigate('Profile')}
//           >
//             <Avatar.Image
//               source={{uri: item.avatarURI}}
//               size={24}
//               style={styles.cardAvatar}
//             />
//           </TouchableOpacity>

//           <Text style={styles.cardTitle1}>{item.name}</Text>
//         </View>
//         <Image source={{uri: item.imageURI}} style={styles.cardImage} />

//         <View style={styles.verticleView}>
//           <Pressable
//             style={({pressed}) => [
//               {
//                 backgroundColor: pressed ? '#5a6373' : 'black',
//               },
//               styles.buttonStyle,
//             ]} //onPress={handleSubmitPress}
//           ></Pressable>

//           <Pressable
//             style={({pressed}) => [
//               {
//                 backgroundColor: pressed ? '#5a6373' : 'black',
//               },
//               styles.buttonStylelight,
//             ]} //onPress={handleSubmitPress}
//           ></Pressable>
//         </View>

//         <View style={styles.cardHeader}>
//           <Text category="s1" style={styles.cardTitle}>
//             {item.postTitle}
//           </Text>
//         </View>
//         <View style={styles.cardContent}>
//           <Text>{item.randomText}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={{flex: 1}}>
//       <View style={{flex: 0.5}}>
//         <View style={styles.header}></View>
//         <Image
//           style={styles.avatar}
//           source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
//         />
//         <View style={styles.body}>
//           <View style={styles.bodyContent}>
//             <Text style={styles.name}>John Doe</Text>
//           </View>
//         </View>
//       </View>
//       <View style={{flex: 0.9}}>
//         <FlatList
//           style={styles.container}
//           data={DATA}
//           renderItem={renderItem}
//           keyExtractor={DATA.id}
//         />
//       </View>
//     </View>
//   );

//   //     return(
//   // <ScrollView>
//   // <View style={styles.v}>

//   // <Avatar.Image
//   //                 source={{ uri: DATA.avatarURI }}
//   //                 size={70}
//   //                 style={styles.cardAvatar}
//   //               />
//   //                <Text style={styles.cardTitle1}>John Doe</Text>

//   // </View>

//   // <Feed/>

//   // </ScrollView>
//   //     )
// };

// const styles = StyleSheet.create({
//   v: {
//     flexDirection: 'row',
//     //justifyContent:'space-between',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: 'lightgray',
//   },
//   cardAvatar: {
//     margin: 16,
//   },
//   cardTitle1: {
//     color: '#444',
//     fontSize: 15,
//     marginTop: 15,
//   },
//   container: {
//     flex: 1,
//   },
//   card: {
//     backgroundColor: '#fff',
//     marginBottom: 25,
//   },
//   cardImage: {
//     width: '100%',
//     height: 300,
//   },
//   buttonStyle: {
//     justifyContent: 'center',
//     backgroundColor: '#1A5DB4',
//     borderWidth: 0,
//     color: '#FFFFFF',
//     borderColor: '#1A5DB4',
//     height: 10,
//     width: 20,
//     alignItems: 'center',
//     borderRadius: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     marginLeft: 10,
//     marginRight: 20,
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   buttonTextStyle: {
//     fontFamily: 'PlayfairDisplay-SemiBold',
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: 'white',
//   },
//   buttonStylelight: {
//     justifyContent: 'center',
//     backgroundColor: '#d41111',
//     borderWidth: 0,
//     color: '#FFFFFF',
//     borderColor: '#1A5DB4',
//     height: 10,
//     width: 25,
//     alignItems: 'center',
//     borderRadius: 70,
//     paddingVertical: 12,
//     //paddingHorizontal: 32,
//     marginLeft: 5,
//     marginRight: 35,
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   verticleView: {
//     flexDirection: 'row',
//   },
//   cardHeader: {
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   cardTitle: {
//     color: '#444',
//   },
//   cardTitle1: {
//     color: '#444',
//     fontSize: 15,
//     marginTop: 15,
//   },
//   cardAvatar: {
//     margin: 16,
//   },
//   cardContent: {
//     padding: 10,
//     borderWidth: 0.25,
//     borderColor: '#eee',
//   },
//   header: {
//     backgroundColor: '#1A5DB4',
//     height: 150,
//   },
//   avatar: {
//     width: 130,
//     height: 130,
//     borderRadius: 63,

//     position: 'absolute',
//     marginTop: 50,
//     marginLeft: 130,
//   },
//   name: {
//     fontSize: 22,
//     color: '#000000',

//     fontWeight: '100',
//   },
//   body: {
//     marginTop: 40,
//   },
//   bodyContent: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 30,
//   },
//   name: {
//     fontSize: 28,
//     color: '#696969',
//     fontWeight: '600',
//   },
//   info: {
//     fontSize: 16,
//     color: '#00BFFF',
//     marginTop: 10,
//   },
//   description: {
//     fontSize: 16,
//     color: '#696969',
//     marginTop: 10,

//     textAlign: 'center',
//   },
//   buttonContainer: {
//     marginTop: 10,
//     height: 45,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     width: 250,
//     borderRadius: 30,
//     backgroundColor: '#00BFFF',
//   },
// });

// export default ProfileScreen;


// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

// const ProfileScreen = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // Fetch user data here
//     // For demonstration, we'll simulate the data fetch and update after 2 seconds
//     setTimeout(() => {
//       const userData = {
//         name: "John Doe",
//         username: "@johndoe",
//         supportersCount: 260000,
//         profilePicture: require("senet/assets/users/user-1.jpg"), // Replace with your own profile picture asset
//       };
//       setUserData(userData);
//     }, 2000);
//   }, []);

//   const handleEditProfile = () => {
//     // Implement the logic to handle the Edit Profile button press here
//     console.log("Edit Profile button clicked!");
//   };

//   return (
//     <View style={styles.container}>
//       {userData && (
//         <View style={styles.profileContainer}>
//           <View style={styles.profilePicture} />
//           <Image
//             style={styles.profileImage}
//             resizeMode="cover"
//             source={userData.profilePicture}
//           />
//           <Text style={styles.name}>{userData.name}</Text>
//           <Text style={styles.username}>{userData.username}</Text>
//           <Text style={styles.supporters}>{`${userData.supportersCount} Supporters`}</Text>
//           <TouchableOpacity
//             style={styles.editButton}
//             onPress={handleEditProfile}
//           >
//             <Text style={styles.editButtonText}>Edit Profile</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f7f7f7",
    
    
//   },
//   profileContainer: {
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     elevation: 5,
//     flexDirection: "row",
//   },
//   profilePicture: {
//     width: 75,
//     height: 75,
//     borderRadius: 75,
//     backgroundColor: "#e1e1e1",
//     marginBottom: 10,
//   },
//   profileImage: {
//     width: 75,
//     height: 75,
//     borderRadius: 75,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   username: {
//     fontSize: 18,
//     color: "#888",
//     marginBottom: 10,
//   },
//   supporters: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   editButton: {
//     backgroundColor: "#4c68d7",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//   },
//   editButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

// export default ProfileScreen;

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createMaterialTopTabNavigator();

const YourPostsScreen = () => (
  <View style={styles.tabContainer}>
    <Text>Your Posts</Text>
    {/* Your posts content here */}
  </View>
);

const MentionScreen = () => (
  <View style={styles.tabContainer}>
    <Text>Mentions</Text>
    {/* Mention content here */}
  </View>
);

const ProfileScreen = ({navigation}) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <Text
          {...props}
          style={{
            color: 'black',
            fontSize: 20,
            fontFamily: 'layfairDisplay-SemiBold',
            fontWeight: 'bold',
          }}>
          John Doe
        </Text>
      ),
      headerStyle: {
        backgroundColor: '#ffffff', //Set Header color
        borderWidth: 2,
      },
      headerRight: () => (
        <Ionicons
          name="reorder-four-outline"
          size={40}
          color="black"
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate('MessagesScreen')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Header */}

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <View style={styles.infoContainer}>
        <Image
          source={require('senet/assets/users/user-5.jpg')}
          style={styles.profilePic}
        />
        
        </View>
        {/* Followers and Edit Profile */}
        <View style={styles.followersContainer}>
          <View style={styles.followerCount}>
          <Text style={styles.followersCount2}>200K </Text>
          <Text style={styles.followersText}>Supporters</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
</View>
<View style={styles.infoContainer}>
          <Text style={styles.nameText}>John Doe</Text>
          <Text style={styles.usernameText}>@johndoe</Text>
          <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Support</Text>
        </TouchableOpacity>
        </View>
<View style={styles.profileContainer2}>

        {/* Follow Button */}
       <Text style={styles.bioText}>This is my Bio</Text>

      </View>

      {/* Tab Navigator */}
      <Tab.Navigator screenOptions={({route}) => ({
        // headerShown: false,
        tabBarShowLabel: false,
        //tabBarActiveBackgroundColor: '#307ecc',
        tabBarIcon: ({focused, color, size, iconName}) => {
          if (route.name === 'YourPosts') {
            iconName = focused ? 'apps' : 'apps-outline';
          } else if (route.name === 'Mention') {
            iconName = focused ? 'infinite' : 'infinite-outline';
          } 
          // You can return any component that you like here!
          return (
            <Ionicons
              name={iconName}
              size={20}
              color={'#000000'}
              //color={'#00000'}
              // source={require('senet/assets/attachments.png')}
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarVisibilityAnimationConfig: {
          duration: 300,
          useNativeDriver: true,
        },
        animantionEnabled: true,
        sifting: true,
        swipeEnabled: true,
        style: styles.tabBar
      })} >
        <Tab.Screen name="YourPosts" component={YourPostsScreen} />
        <Tab.Screen name="Mention" component={MentionScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingRight: 20,
    flexDirection: 'row',
  },
  profileContainer2: {
    alignItems: 'flex-start',
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  followersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 20,
  },
  followerCount: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
    padding: 10,
  },
  followersCount2: {
    marginRight: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  followersText: {
    marginRight: 10,
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
  },
  editButtonText: {
    color: 'black',
  },
  infoContainer: {
    alignItems: 'flex-start',
   
    marginLeft: 20,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  
  },
  usernameText: {
    color: 'gray',
  
    
  },
  bioText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
   
  },
  followButton: {
   alignItems: 'center',
  
    
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  followButtonText: {
    color: '#1A5DB4',
    fontWeight: 'bold',
  },
 
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
