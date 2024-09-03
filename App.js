import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import TabNavigator from './src/navigation/TabNavigator';
import { AuthProvider } from './src/authentication/authContext';
import { Platform, Alert, PermissionsAndroid } from 'react-native';
import * as Permissions from 'react-native-permissions';

const App = () => {

  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerNavigator>
          <TabNavigator />
        </DrawerNavigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
