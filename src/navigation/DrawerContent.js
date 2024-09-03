import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';





const CustomDrawerContent = (props) => {
    const navigation = useNavigation();
    const handleLogout = async () => {
      // Implement your logout logic here, for example, clear user data from AsyncStorage
      await AsyncStorage.clear();
      // Navigate to the login screen or perform any other necessary actions
      // This is just a placeholder, replace it with your actual navigation logic
       navigation.navigate('LoginSc');
    };
  
    return (
      <DrawerContentScrollView {...props}>
        {/* Logo at the top of the drawer */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/image/logogoogle.png')}
            style={styles.logo}
          />
        </View>
  
        {/* User profile information */}
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>Utkarsh Singh</Text>
          <Text style={styles.userEmail}>utkarshsingh@gmail.com</Text>
        </View>
  
        {/* Drawer items */}
        <DrawerItemList {...props} labelStyle={styles.drawerItemLabel}/>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.drawerItemLabel}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
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
      fontWeight:"bold" // Change the color to your desired color
    },
    logoutButton: {
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
  });

  export default CustomDrawerContent;