import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker'; // Import DocumentPicker

const UserProfileScreen = ({ ...props }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [userProfile, setUserProfile] = useState(null);

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
      const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/v1/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setFirstName(data.firstName);
        setEmail(data.email);
        setLastName(data.lastName);
        setUserProfile(data);
      } else {
        console.error('Error fetching user profile:', data.message);
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
    }
  };

  const handleChange = (key, value) => {
    setUserData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleUpdate = () => {
    console.log('Updated user data:', userData);
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

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {userProfile && userProfile.profilePic ? (
          <Image source={{ uri: userProfile.profilePic }} style={styles.profilePic} />
        ) : (
          <TouchableOpacity style={styles.profilePlaceholder} onPress={handleDocumentUpload}>
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.name}>{firstName} {lastName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.info}
          placeholder={email}
          value={userData.email}
          onChangeText={text => handleChange('email', text)}
        />
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.info}
          placeholder="+918290308929"
          value={userData.phoneNumber}
          onChangeText={text => handleChange('phoneNumber', text)}
        />
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#000"
  },
  infoContainer: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: "#000"
  },
  info: {
    fontSize: 16,
    color: "#000",
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 4,
  },
  updateButton: {
    backgroundColor: '#00008b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  updateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default UserProfileScreen;
