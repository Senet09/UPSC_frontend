import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const ContactUsScreen = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSendMessage = () => {
    // Implement logic to send the message
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    // Add your logic to send the message (e.g., API call or other actions)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your Message"
        value={message}
        onChangeText={(text) => setMessage(text)}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
        <Text style={styles.buttonText}>Send Message</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 8,
  },
  messageInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#00008b',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactUsScreen;
