

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Share, Image, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommentModal from './CommentModal';
import PDFSlider from './PDFSlider'; // Import PDFViewer component
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomTabBar from './CustomTab';
const Submissions = ({ route, navigation }) => {
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostDelete, setSelectedPostDelete] = useState(null);
  const [likeStateMap, setLikeStateMap] = useState({});
  const [userNames, setUserNames] = useState({});
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [samplePosts, setSamplePosts] = useState([]);
  const [userId, setUserId] = useState('');
  const [likeCounts, setLikeCounts] = useState(initialLikeCounts);
  const [likedPosts, setLikedPosts] = useState(samplePosts.map(() => false));
  const { question } = route.params || {};
  const [modalAnswerVisible, setModalAnswerVisible] = useState(false); // New state for modal answer visibility
  const initialLikeCounts = samplePosts.map(post => post.likes.length);
  const [modalVisible, setModalVisible] = useState(false);
  const [showChecked, setShowChecked] = useState(false);
  const [showUnchecked, setShowUnchecked] = useState(false);
  const [showMySubmissions, setShowMySubmissions] = useState(false);


  const toggleModalAnswer = () => {
    setModalAnswerVisible(!modalAnswerVisible);
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/file/file/${question._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setSamplePosts(data.data.files);
      const filteredFiles = data.data.files.filter(file => !file.isModalAnswer);
      // Fetch user names for each user ID

      const userIds = filteredFiles.map(post => post.userId);
      const names = {};
      for (const userId of userIds) {
        const userName = await fetchUserNames(userId);
        names[userId] = userName;
      }
      setUserNames(names);

      // Set likedPosts state 
      const likedPosts = data.data.files.map(post => post.likes.includes(userId));
      setLikedPosts(likedPosts);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, e.g., show error message to user
    }
  };

  const handleShowChecked = () => {
    setShowChecked(!showChecked);
  };

  const handleShowUnchecked = () => {
    setShowUnchecked(!showUnchecked);
  };

  const handleShowMySubmissions = () => {
    setShowMySubmissions(!showMySubmissions);
  };



  const filteredPosts = samplePosts.filter(post => {
    if (showChecked && !post.isChecked) return false;
    if (showUnchecked && post.isChecked) return false;
    if (showMySubmissions && post.userId !== userId) return false;
    return true;
  });

  useFocusEffect(
    useCallback(() => {
      if (navigation.isFocused()) {
        fetchUserId();
      }
    }, [navigation])
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {


    fetchData();

  }, []);
  useEffect(() => {
    const map = {};
    samplePosts.forEach((post, index) => {
      map[post._id] = index;
    });
    setLikeStateMap(map);
  }, [samplePosts]);

  const handleLike = async (postId) => {
    if (likeStateMap && postId in likeStateMap) {
      const postIndex = likeStateMap[postId];

      try {
        const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/file/files/${postId}/like/${userId}`);
        const data = await response.json();

        if (response.ok) {
          // Update samplePosts with the updated post object
          const updatedSamplePosts = [...samplePosts];
          updatedSamplePosts[postIndex] = data.file;
          setSamplePosts(updatedSamplePosts);

          // Update likeCounts with the new like count
          // const updatedLikeCounts = [...likeCounts];
          // console.log(updatedLikeCounts)
          // // updatedLikeCounts[postIndex] = data.file.likes.length;
          // // setLikeCounts(updatedLikeCounts);

          //Update likedPosts to reflect whether the current user has liked the post
          const updatedLikedPosts = [...likedPosts];
          updatedLikedPosts[postIndex] = data.file.likes.includes(userId);
          setLikedPosts(updatedLikedPosts);
        } else {
          console.error('Failed to like post:', data.message);
          // Handle error response from the server
          // Display an error message to the user
        }
      } catch (error) {
        console.error('Error liking post:', error);
        // Handle network error or other unexpected errors
        // Display an error message to the user
      }
    } else {
      console.error('Invalid postId:', postId);
    }
  };




  const handleUpload = () => {
    navigation.navigate("UploadPage", { questionId: question._id });
  };



  const handleComment = (post) => {
    setSelectedPost(post);
    setCommentModalVisible(true);
  };

  const handleSubmitComment = async (comment) => {
    console.log(comment)
    console.log(selectedPost._id)

    if (selectedPost) {
      try {

        const userId = await AsyncStorage.getItem('id');
        console.log(userId)
        const formdata = new FormData();
        formdata.append("text", comment);
        formdata.append("userId", userId)
        console.log(formdata)
        const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/file/comments/${selectedPost._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formdata
        });
        const data = await response.json();

        if (response.ok) {
          // Assuming fetchData fetches the latest data including comments
          setCommentModalVisible(false);
        } else {
          console.error('Failed to add comment:', data.message);
          // Handle error response from the server
          // Display an error message to the user
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        // Handle network error or other unexpected errors
        // Display an error message to the user
      }
    }
  };
  const fetchUserNames = async (userId) => {
    try {
      const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/v1/name/${userId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch user names');
      }

      const data = await response.json();
      console.log(data)
      return data.userName;
    } catch (error) {
      console.error('Error fetching user names:', error);
      return [];
    }
  };

  const handleShare = () => {
    const message = `Check out this question: ${question.question}`;
    Share.share({
      message: message,
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  const handleDeletePress = async (postId) => {
    try {
      console.log("Deleting post:", postId);
      const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/file/delete/${question._id}/${postId}`, {
        method: 'DELETE',
      });
      console.log("Delete response:", response);
      if (response.ok) {
        console.log("Post deleted successfully");
        // Remove the deleted post from samplePosts
        const updatedSamplePosts = samplePosts.filter(post => post._id !== postId);
        console.log("Updated sample posts:", updatedSamplePosts);
        setSamplePosts(updatedSamplePosts);
        // Close the modal
        setModalVisible(false);
      } else {
        console.error('Failed to delete post');
        // Handle error response from the server
        // Display an error message to the user
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle network error or other unexpected errors
      // Display an error message to the user
    }
  };


  const handleHidePress = () => {
    setModalVisible(false);
    onHide(postId);
  };

  const handleEditPress = () => {
    setModalVisible(false);
    onEdit(postId);
  };

  const modalAnswerPost = samplePosts.find(post => post.isModalAnswer);
  const otherPosts = filteredPosts.filter(post => !post.isModalAnswer);
  const renderPosts = (posts) => {

    const handleDelete = (post) => {
      setModalVisible(true)
      console.log(post)
      setSelectedPostDelete(post);

    };
    return (
      <>

        {modalAnswerPost && modalAnswerVisible && (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <View style={styles.userNameContainer}>
                <Text style={styles.userName}>A</Text>
              </View>
              <Text style={styles.postName}>MODAL ANSWER</Text>

              <Ionicons name="medal" size={24} color="red" style={styles.checkIcon} />

            </View>
            <TouchableOpacity onPress={() => {
              setSelectedPdf(modalAnswerPost.url);
              setPdfModalVisible(true);
            }} style={styles.zoomButton}>
              <Ionicons name="expand" size={24} color="black" />
            </TouchableOpacity>

            <PDFSlider link={modalAnswerPost.url} />

          </View>
        )}
        {!modalAnswerVisible && (posts.map((post, index) => (
          <View key={post._id} style={styles.postContainer}>
            <View style={styles.postHeader}>
              <View style={styles.userNameContainer}>
                <Text style={styles.userName}>{userNames[post.userId]?.charAt(0)}</Text>
              </View>
              <Text style={styles.postName}>{userNames[post.userId]}</Text>
              {post.isChecked && (
                <Ionicons name="checkmark-circle" size={24} color="green" style={styles.checkIcon} />
              )}
              {post.userId === userId && (
                <TouchableOpacity onPress={() => handleDelete(post)} >
                  <Ionicons name="ellipsis-vertical" size={24} color="black" style={styles.optionsButton} />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={() => {
              setSelectedPdf(post.url);
              setPdfModalVisible(true);
            }} style={styles.zoomButton}>
              <Ionicons name="expand" size={24} color="black" />
            </TouchableOpacity>

            <PDFSlider link={post.url} />

            <View style={styles.postActions}>
              <TouchableOpacity onPress={() => handleLike(post._id)} style={styles.iconContainer}>
                <Ionicons name={likedPosts[index] ? 'heart' : 'heart-outline'} size={24} color={likedPosts[index] ? 'red' : 'black'} />
                <Text style={styles.likeCounts}>{post.likes.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleComment(post)} style={styles.iconContainer}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                <Text style={styles.likeCounts}>{post.comments.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare} style={styles.iconContainer}>
                <Ionicons name="share-social-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>

          </View>
        )))}
      </>
    );
  };

  const CheckedSubmissions = () => {
    const checkedPosts = otherPosts.filter(post => post.isChecked && post.userId != userId);
    const userPost = samplePosts.find(post => post.userId === userId && post.isChecked);
    return (
      <ScrollView>
        {userPost && userPost.isChecked && !modalAnswerVisible && renderPosts([userPost])}
        {renderPosts(checkedPosts)}
      </ScrollView>
    );
  };

  const UncheckedSubmissions = () => {
    const uncheckedPosts = otherPosts.filter(post => !post.isChecked && post.userId != userId);
    const userPost = samplePosts.find(post => post.userId === userId && !post.isChecked);

    return (
      <ScrollView>
        {userPost && !modalAnswerVisible && renderPosts([userPost])}
        {renderPosts(uncheckedPosts)}
      </ScrollView>
    );
  };

  const Tab = createMaterialTopTabNavigator();



  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>
      {modalAnswerPost && (
        <TouchableOpacity onPress={toggleModalAnswer} style={styles.showModalButton}>

          <Text style={styles.showModalText}>{modalAnswerVisible ? 'Hide Modal Answer' : 'Show Modal Answer'}</Text>
          <Ionicons name={modalAnswerVisible ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
        </TouchableOpacity>
      )

      }
      {/* {!modalAnswerVisible && (
        <View style={styles.filterButtons}>
          <TouchableOpacity onPress={handleShowChecked} style={[styles.filterButton1, showChecked && styles.activeFilterButton]}>
            <Text style={[styles.filterButtonText, showChecked && styles.activeFilterButtonText]}>Checked</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShowUnchecked} style={[styles.filterButton, showUnchecked && styles.activeFilterButton]}>
            <Text style={[styles.filterButtonText, showUnchecked && styles.activeFilterButtonText]}>Unchecked</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShowMySubmissions} style={[styles.filterButton2, showMySubmissions && styles.activeFilterButton]}>
            <Text style={[styles.filterButtonText, showMySubmissions && styles.activeFilterButtonText]}>My Answer</Text>
          </TouchableOpacity>
        </View>
      )

      } */}



      {!modalAnswerVisible && (
        <Tab.Navigator


          screenOptions={{ swipeEnabled: false }}


        >
          <Tab.Screen name="Checked" component={CheckedSubmissions} />
          <Tab.Screen name="Unchecked" component={UncheckedSubmissions} />
        </Tab.Navigator>
      )
      }
      {modalAnswerVisible && (
        <ScrollView>{renderPosts()}</ScrollView>
      )
      }

      <TouchableOpacity onPress={handleUpload} style={styles.uploadButton}>
        <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
        <Text style={styles.uploadButtonText}>Upload your nswer</Text>
      </TouchableOpacity>

      <CommentModal
        visible={commentModalVisible}
        onClose={() => setCommentModalVisible(false)}
        comments={selectedPost ? selectedPost.comments : []}
        onSubmitComment={handleSubmitComment}
      />
      <Modal
        visible={pdfModalVisible}
        animationType="slide"
        onRequestClose={() => setPdfModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setPdfModalVisible(false)} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <PDFSlider link={selectedPdf} />
        </View>
      </Modal>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => handleDeletePress(selectedPostDelete._id)} style={styles.option}>
            <Text style={styles.optionText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
    color: "#000"
  },
  postContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 2, // Add a thicker border bottom
    borderColor: '#00008d', // Border color
  },
  postName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10, // Add some space between the username circle and the name
  },
  userNameContainer: {
    width: 36,
    height: 36,
    borderRadius: 18, // Make it half of the width and height to create a circle
    backgroundColor: '#00008d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 2, // Add a thicker border bottom
    borderColor: '#00008d',
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  uploadButton: {
    position: 'absolute',
    bottom: 20, // Adjust the distance from the bottom
    right: 20, // Adjust the distance from the right
    backgroundColor: '#00008d',
    borderRadius: 25,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Optional: Add elevation for a shadow effect
  },
  uploadText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  zoomButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    zIndex: 1, // Ensure the button is above other content
  },
  likeCounts: {
    color: "#000000",
    marginLeft: 5,
    fontSize: 20
  },
  checkIcon: {
    marginLeft: 'auto',
    // Align the icon to the right
  },
  showModalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
    borderWidth: 0.5,
    height: 50,
    borderRadius: 5,
    justifyContent: "space-between",

  },
  showModalText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 18,
    fontWeight: "bold",
    color: "#00008b"

  },
  optionsButton: {
    marginLeft: 'auto', // Move the ellipsis-vertical icon to the far left

  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  option: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'red',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,

    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'transparent',
  },
  filterButton1: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 25,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'transparent',
  },
  filterButton2: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginLeft: 25,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'transparent',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#000',
  },
  activeFilterButton: {
    backgroundColor: 'lightblue',
  },
  activeFilterButtonText: {
    color: '#000',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00008b',
    padding: 12,
    borderRadius: 8,
    margin: 16,
  },
  uploadButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: 'bold',
  },
});

export default Submissions;



