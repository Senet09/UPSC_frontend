import React, { useContext, useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import AuthContext from './authContext';
import { useNavigation } from '@react-navigation/native';
const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
 const navigation=useNavigation()
    const handleLoginNow = () => {
      // Navigate to the login screen
      // Replace 'navigateToLoginScreen' with your navigation logic
      navigation.navigate('LoginSc')
      setShowModal(false);
    };

    const handleLater = () => {
      setShowModal(false);
    };

    if (!user) {
      return (
        <>
          <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowModal(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Please login to continue</Text>
                <View style={styles.buttonContainer}>
                  <Button title="Login Now" onPress={handleLoginNow} />
                  <Button title="Later" onPress={handleLater} />
                </View>
              </View>
            </View>
          </Modal>
          <WrappedComponent {...props} />
        </>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default withAuth;
