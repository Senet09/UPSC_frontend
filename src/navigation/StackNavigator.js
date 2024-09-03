import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator, HeaderBackButton, TransitionPresets } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen.js';
import HomeScreen from '../components/HomeScreen.js';
import LoginSc from '../screens/Login.js';
import TabNavigator from './TabNavigator.js';
import Signup1 from '../screens/SignUp1.js';
import TestList from '../components/TestList.js';
import HomePage from '../components/HomePage.js';
import { ProductDetailPage } from '../components/Ecommerce.js';
import Test from '../components/Test.js';
import GsTest from '../components/GsTest.js';
import TestOverview from '../components/TestOverview.js';
import GenerateQuestion from '../components/GenerateQuestion.js';
import MainsQuestionList from '../components/MainsQuestion.js';
import Submissions from '../components/Submissions.js';
import UploadPage from '../components/UploadFile.js';
import PersonalizePrelims from '../components/PersonalizePrelims.js';
import Learn from '../screens/Learn.js';
import TestAnalysis from '../components/TestAnalysis.js';
import MyRankingPage from '../components/Rank.js';
import Cards from '../components/Cards.js';
import PreviousCards from '../components/PreviousCards.js';
import GenerateTopic from '../components/GenerateTopic.js';
import TopicTestList from '../components/TopicTestList.js';
import PreTopicTests from '../components/PreTopicTests.js';
import AttemptedTestList from '../components/Attempted.js';
import AttemptAnalysis from '../components/AttemptAnalysis.js';
import GeneratedTests from '../components/GeneratedTest.js';
import GeneratedTopicWithoutId from '../components/GeneratedTopicWithoutId.js';
import DailyNotesScreen from "../screens/Learn.js"
import NoteDetailsScreen from "../screens/Learn.js"
import MonthlyNotesScreen from "../screens/Learn.js"
import CaNoteDetailsScreen from '../screens/CaDetailScreen.js';
import CardsScreen from '../components/CardBrowser.js';
import SubjectTime from '../components/SubjectTime.js';
import FriendsTime from '../components/FriendsTime.js';
import AddFriendScreen from "../components/AddFriends.js";
import CategoriesPage from '../ecommerce/CategoryPage.js';
import BooksPage from '../ecommerce/BooksPage.js';
import ProductDetailsPage from '../ecommerce/ProductDetails.js';
import CartPage from '../ecommerce/Cart.js';
import CheckoutPage from '../ecommerce/Checkout.js';
// import DrawerNavigator from './DrawerNavigator.js';
const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator();
const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginSc">
      <Stack.Screen
        name="LoginSc"
        component={LoginSc}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup1"
        component={Signup1}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen"
      screenOptions={{
        ...TransitionPresets.BottomSheetAndroid, // or other transition presets
      }}

    >
      {/* SplashScreen which will come once for 5 Seconds */}
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        // Hiding header for Splash Screen
        options={{ headerShown: false }}
      />
      {/* Auth Navigator: Include Login and Signup */}
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup1"
        component={Signup1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="TabNavigator"
        component={DrawerNavigator}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="LoginSc"
        component={LoginSc}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="customdrawer"
        component={CustomDrawerContent}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen name="MainsQuestionList" component={QuestionList} />
      <Stack.Screen name="MainsQuestionDetail" component={QuestionDetail} /> */}
      {/* Navigation Drawer as a landing page */}

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TestList"
        component={TestList}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TestPage"
        component={Test}
        // Hiding header for Navigation Drawer
        options={{ headerLeft: false }}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GS Test"
        component={GsTest}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailPage}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Cards"
        component={Cards}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PreviousCards"
        component={PreviousCards}
      // Hiding header for Navigation Drawer

      />


      <Stack.Screen
        name="TestOverview"
        component={TestOverview}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen
        name="GenerateQuestion"
        component={GenerateQuestion}
        options={{ title: 'Mains' }}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen
        name="MainsQuestionList"
        component={MainsQuestionList}
        options={{ title: 'Mains Questions' }}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen
        name="Submissions"
        component={Submissions}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen
        name="UploadPage"
        component={UploadPage}
      // Hiding header for Navigation Drawer


      />
      <Stack.Screen
        name="Personalize"
        component={PersonalizePrelims}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen
        name="Test Analysis"
        component={TestAnalysis}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen
        name="Learn"
        component={Learn}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen
        name="Rank"
        component={MyRankingPage}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen
        name="Generate Topicwise Test"
        component={GenerateTopic}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen
        name="Topic-Wise Test Generated"
        component={TopicTestList}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen
        name="Test"
        component={PreTopicTests}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen
        name="Attempted Tests"
        component={AttemptedTestList}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen
        name="Attempt Analysis"
        component={AttemptAnalysis}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen
        name="Generated Tests"
        component={GeneratedTests}
      // Hiding header for Navigation Drawer

      />

      <Stack.Screen
        name="Generate"
        component={GeneratedTopicWithoutId}
      // Hiding header for Navigation Drawer

      />
      <Stack.Screen name="DailyNotes" component={DailyNotesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DailyNoteDetails" component={NoteDetailsScreen} options={{ title: 'Note Details' }} />
      <Stack.Screen name="MonthlyNotes" component={MonthlyNotesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MonthlyNoteDetails" component={NoteDetailsScreen} options={{ title: 'Note Details' }} />
      <Stack.Screen name="CaNoteDetails" component={CaNoteDetailsScreen} options={{ title: 'Note Details' }} />
      <Stack.Screen name="Cards List" component={CardsScreen} />
      <Stack.Screen name="Time Spent" component={SubjectTime} options={{ title: 'Time Spent' }} />
      <Stack.Screen name="Friends Time" component={FriendsTime} options={{ title: 'Friends Time' }} />
      <Stack.Screen name="Add Friends" component={AddFriendScreen} options={{ title: 'Make Group' }} />
      <Stack.Screen name="Categories" component={CategoriesPage} options={{ title: 'Categories' }} />
      <Stack.Screen name="Books" component={BooksPage} options={{ title: 'Books' }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsPage} options={{ title: 'Details' }} />
      <Stack.Screen name="Cart" component={CartPage} options={{ title: 'Cart' }} />
      <Stack.Screen name="Checkout" component={CheckoutPage} options={{ title: 'Checkout' }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
