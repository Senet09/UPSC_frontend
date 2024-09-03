import React, { useEffect, useState, useCallback } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import StackNavigator from './StackNavigator';
import Learn from '../screens/Learn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Leaderboard from '../components/LeaderBoard';
import TabNavigator from './TabNavigator';
import CoinWalletScreen from '../components/CoinWalletScreen';
import ContactUsScreen from '../components/ContactUs';
import UserProfileScreen from '../components/UserProfile';
import MarksAnalysisPage from '../components/MarkAnalysis';
import { useFocusEffect } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ ...props }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchUserId();
  }, []);


  useFocusEffect(
    useCallback(() => {
      if (props.navigation.isFocused()) {
        fetchUserId();
      }
    }, [props.navigation])
  );

  useFocusEffect(
    useCallback(() => {
      if (userId && props.navigation.isFocused()) {
        fetchUserProfile();
      }
    }, [userId, props.navigation])
  );

  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('id');
      if (storedUserId !== null) {
        setUserId(storedUserId);
      }
    } catch (error) {
      console.error('Error fetching userId:', error);
    }
  };



  const fetchUserProfile = async () => {
    try {
      // Get the JWT token from AsyncStorage
      // Make an HTTP GET request to the '/profile' route on your server
      const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/v1/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include the JWT token in the request headers
        },
      });

      // Parse the JSON response
      const data = await response.json();

      // Check if the request was successful
      if (response.ok) {
        // Extract user profile data from the response

        console.log(data)
        setFirstName(data.firstName);
        setEmail(data.email)
        setLastName(data.lastName)
        // Update the state with the user profile data
        setUserProfile(data);

      } else {
        // Handle error responses (e.g., unauthorized access)
        console.error('Error fetching user profile:', data.message);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Fetch error:', error.message);
    }
  };

  const handleDocumentUpload = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      console.log('Document picked:', res);

      // Handle document upload here
      // For example, you can upload the document to your server
      // and update the user profile with the uploaded document URL
      const formData = new FormData();
      formData.append('image', res);

      const uploadResponse = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/v1/profile-pic/${userId}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any additional headers required by your backend
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const uploadedDocumentUrl = await uploadResponse.json();

      // Update the user profile with the uploaded document URL
      // For example, you can save it to AsyncStorage or update state
      // setUserProfile({ ...userProfile, documentUrl: uploadedDocumentUrl });
      console.log('Document uploaded successfully:', uploadedDocumentUrl);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('DocumentPicker Error: ', err);
        Alert.alert('Upload failed', 'Failed to upload document. Please try again.');
      }
    }
  };


  const handleLogout = async () => {
    // Implement your logout logic here, for example, clear user data from AsyncStorage
    await AsyncStorage.clear();
    // Navigate to the login screen or perform any other necessary actions
    // This is just a placeholder, replace it with your actual navigation logic
    props.navigation.navigate('LoginSc');
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Logo at the top of the drawer */}
      <View style={styles.profileContainer}>
        {userProfile && userProfile.profilePic ? (
          <Image source={{ uri: userProfile.profilePic }} style={styles.profilePic} />
        ) : (
          <TouchableOpacity style={styles.profilePlaceholder} onPress={handleDocumentUpload}>
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* User profile information */}
      <View style={styles.profileInfo}>
        <Text style={styles.userName}>{firstName} {lastName}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>

      {/* Drawer items */}
      <DrawerItemList {...props} labelStyle={styles.drawerItemLabel} />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} />
        <Text style={styles.drawerItemLabel}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = ({ userProfile }) => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} userProfile={userProfile} />}>
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Ultimate"
        component={Learn}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'medal' : 'medal-outline'} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Marks Analysis"
        component={MarksAnalysisPage}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'barcode' : 'barcode-outline'} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Coins"
        component={CoinWalletScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'wallet' : 'wallet-outline'} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={UserProfileScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'mail-outline' : 'mail-outline'} size={size} color={color} />
          ),
        }}
      />
      {/* Add more drawer screens here */}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  logo: {
    width: 100,
    height: 100,
    // Add any additional styling as needed
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
  },
  drawerItemLabel: {
    // Customize the label text style here
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold', // Change the color to your desired color
  },
  logoutButton: {
    borderTopWidth: 1,
    flexDirection: "row",
    borderTopColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  profileContainer: {
    alignItems: 'center',

  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default DrawerNavigator;
