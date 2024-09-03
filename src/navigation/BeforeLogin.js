import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation

import {createStackNavigator} from '@react-navigation/stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens
//import SplashScreen from '../screens/SplashScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';

const Stack = createStackNavigator();

const BeforeLogin = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default BeforeLogin;
