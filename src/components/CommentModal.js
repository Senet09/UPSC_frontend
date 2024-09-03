import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native';

const CommentModal = ({ visible, onClose, comments, onSubmitComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim() !== '') {
      onSubmitComment(newComment); // Call onSubmitComment with the new comment
      setNewComment(''); // Clear the input field after submitting
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text style={styles.title}>Comments</Text>
              <ScrollView contentContainerStyle={styles.commentsContainer}>
                {comments.map(comment => (
                  <View key={comment._id} style={styles.commentItem}>
                    <Text style={styles.commentText}>{comment.text}</Text>
                  </View>
                ))}
              </ScrollView>
              <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={text => setNewComment(text)}
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmitComment}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#00008d',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeText: {
    fontSize: 16,
    color: 'blue',
  },
  commentsContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  commentItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  commentText: {
    fontSize: 16,
  },
});

export default CommentModal;
