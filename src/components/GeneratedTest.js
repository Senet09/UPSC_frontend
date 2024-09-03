import React from "react"
import AttemptedTestList from "./Attempted";
import UnAttemptedTestList from "./Unattempted";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const GeneratedTests = ({ route, navigation }) => {
    return (
      <Tab.Navigator>
           <Tab.Screen
          name="Available Test"
          component={UnAttemptedTestList}        
        />
        
        <Tab.Screen
          name="Attempted Test"
          component={AttemptedTestList}
        />
      
      </Tab.Navigator>
    );
  };
  

  export default GeneratedTests;