import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Highlights from './Highlights';
import MarksAnalysisPage from './MarkAnalysis';
import SectionalAnalysis from './SectionalAnalysis';
import TestResults from './TestResults';
const Tab = createMaterialTopTabNavigator();

const Performance = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#000099', // Color of the active tab
        tabBarInactiveTintColor: '#000000', // Color of inactive tabs
        tabBarScrollEnabled: true, // Enable horizontal scroll for tabs
        tabBarLabelStyle: {
          fontWeight: 'bold', // Make tab names bold
          fontSize: 14, // Customize font size
        },
        tabBarStyle: {
          width: 'auto', // Auto-width for each tab
        },
      })}
    >
      <Tab.Screen name="Highlight" component={Highlights} />
      <Tab.Screen name="Test Results" component={TestResults} />
      <Tab.Screen name="Mark Analysis" component={MarksAnalysisPage}/>
      <Tab.Screen name="Sectional Analysis" component={SectionalAnalysis} />
      {/* Add more tabs here if needed */}
    </Tab.Navigator>
  );
};

export default Performance;
