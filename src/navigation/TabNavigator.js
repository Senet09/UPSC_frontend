import React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Ionicons from 'react-native-vector-icons/Ionicons';
import Learn from '../screens/Learn';
import HomePage from '../components/HomePage';
import { ProductListingPage } from '../components/Ecommerce';
import RevisionPage from '../components/Revision';
import Performance from '../components/Performance';
import HomePageEcommerce from '../ecommerce/HomePage';
const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: false,
        tabBarShowLabel: false,
        //tabBarActiveBackgroundColor: '#307ecc',
        tabBarIcon: ({ focused, color, size, iconName }) => {
          if (route.name === 'Current Affair') {
            iconName = focused ? 'book-sharp' : 'book-outline';
          } else if (route.name === 'Revise') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'UPSC') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Ecommerce') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'ProfilePicUpdate') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Performance') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          }
          // You can return any component that you like here!
          return (
            <Ionicons
              name={iconName}
              size={30}
              color={'#00008d'}
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
      })}>
      <Tab.Screen
        name="UPSC"
        //options={{headerShown: false}}
        options={{
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={30}
              color={'#000000'}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()} // Open the drawer
            />
          ),
        }}
        component={HomePage}
      />
      <Tab.Screen
        name="Current Affair"
        //options={{headerShown: false}}
        options={{
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={30}
              color={'#000000'}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()} // Open the drawer
            />
          ),
        }}
        component={Learn}
      />

      <Tab.Screen
        name="Performance"
        //options={{headerShown: false}}
        options={{
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={30}
              color={'#000000'}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()} // Open the drawer
            />
          ),
        }}
        component={Performance}
      />
      <Tab.Screen
        name="Revise"
        //options={{headerShown: false}}
        options={{
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={30}
              color={'#000000'}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()} // Open the drawer
            />
          ),
        }}
        component={RevisionPage}
      />
      {/* <Tab.Screen name="CommunityList" component={CommunityList} /> */}
      <Tab.Screen
        name="Ecommerce"
        //options={{headerShown: false}}
        options={{
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={30}
              color={'#000000'}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()} // Open the drawer
            />
          ),
        }}
        component={HomePageEcommerce}

      />

    </Tab.Navigator>
  );
};

export default TabNavigator;
