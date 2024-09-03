import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadPDF = ({ navigation, route }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { questionId } = route.params;
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      setSelectedFile(res);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('Error selecting file:', err);
        Alert.alert('Error', 'Failed to select file');
      }
    }
  };

  const uploadFile = async () => {
    try {
      const config = {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const userId = await AsyncStorage.getItem('id');
      console.log(userId)
      console.log(questionId)
      const body = {
        questionId: questionId,
        userId: userId

      };
      const formdata = new FormData();
      formdata.append("image", selectedFile);
      formdata.append("questionId", body.questionId)
      formdata.append("userId", body.userId)
      const response = await axios.post('https://d2jju2h99p6xsl.cloudfront.net/file/upload', formdata, config);

      if (response.data.success) {
        navigation.goBack();
        console.log('File uploaded successfully');

      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={selectFile} style={styles.uploadButton}>
        <Text style={styles.buttonText}>Select PDF</Text>
      </TouchableOpacity>
      {selectedFile && (
        <View style={styles.fileInfo}>
          <Text style={styles.fileInfoText}>{selectedFile.name}</Text>
        </View>
      )}
      <Progress.Bar progress={uploadProgress / 100} width={200} />
      <Text style={styles.uploadInstruction}>
        Instructions to upload
      </Text>
      <Text style={styles.uploadInstruction}>
        1. Ensure you have the correct file format (usually PDF) and file size requirements (often mentioned in the guidelines).
      </Text>
      <Text style={styles.uploadInstruction}>
        2. Make sure your test paper is scanned or saved as per the guidelines provided. Name the file appropriately (as per instructions).
      </Text>
      <Text style={styles.uploadInstruction}>
        3. A pop-up or a browsing window will appear. Browse your computer or device to locate the test paper file. Select it and click 'Open' or 'Upload'.
      </Text>
      <Text style={styles.uploadInstruction}>
        4. Once the file is selected, the system might prompt for confirmation. Review the file and, if correct, proceed to confirm the upload.
      </Text>

      <TouchableOpacity onPress={uploadFile} style={styles.submitButton}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#00008d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#00008d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: 'center',
    alignContent: "center",
    borderRadius: 20,
    marginBottom: 20,
    height: 60,
    width: "80%"
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  fileInfo: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  fileInfoText: {
    fontSize: 16,
  },
  uploadInstruction: {
    fontSize: 20,
    marginBottom: 20,
    color: "#000"
  },
});

export default UploadPDF;
