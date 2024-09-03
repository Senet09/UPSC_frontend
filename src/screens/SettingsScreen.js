import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const TextButton = ({iconName, text, onPress}) => {
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', height: 50}}
      onPress={onPress}>
      <IonIcon name={iconName} color={'black'} size={40} />
      <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  );
};
const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{marginTop: 20, marginLeft: 10}}>
      <TextButton
        iconName="person-circle-outline"
        text="Profile Information"
        onPress={() => navigation.navigate('ProfileInfoUpdate')}
      />
      <TextButton
        iconName="ios-key-outline"
        text="Change Password"
        onPress={() => navigation.navigate('PasswordChangeScreen')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textButton: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    marginLeft: 5,
    color: '#000000',
  },
});

export default SettingsScreen;
