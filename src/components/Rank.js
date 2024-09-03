import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Sample data for top rankers
const topRankersData = [
    { id: 1, name: 'Ravi Patel', rank: 1 },
    { id: 2, name: 'Priya Sharma', rank: 2 },
    { id: 3, name: 'Suresh Singh', rank: 3 },
    { id: 4, name: 'Meera Reddy', rank: 4 },
    { id: 5, name: 'Amit Kumar', rank: 5 },
    { id: 6, name: 'Anjali Gupta', rank: 6 },
    { id: 7, name: 'Rahul Verma', rank: 7 },
    { id: 8, name: 'Neha Joshi', rank: 8 },
    { id: 9, name: 'Vivek Mishra', rank: 9 },
    { id: 10, name: 'Pooja Sharma', rank: 10 },
  ];
  

const totalRankers = 566;

const MyRankingPage = () => {
  // Sample data for your own ranking
  const myRanking = { rank: 5 };

  const renderTopRankerItem = ({ item }) => {
    let medalIcon;
    if (item.rank === 1) {
      medalIcon = <Ionicons name="medal" size={20} color="gold" style={styles.medalIcon} />;
    } else if (item.rank === 2) {
      medalIcon = <Ionicons name="medal" size={20} color="silver" style={styles.medalIcon} />;
    } else if (item.rank === 3) {
      medalIcon = <Ionicons name="medal" size={20} color="brown" style={styles.medalIcon} />;
    } else {
      medalIcon = (
        <View style={styles.serialNumberContainer}>
          <Text style={styles.serialNumber}>{item.rank}</Text>
        </View>
      );
    }

    return (
      <View style={styles.rankerItem}>
        <View style={styles.rankerDetails}>
          {medalIcon}
          <View style={styles.nameContainer}>
            <Text style={styles.rankerName}>{item.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.myRanking}>
        <Text style={styles.myRankingText}>Your Ranking</Text>
        <Text style={styles.myRank}>{myRanking ? myRanking.rank : '-'}</Text>
        <Text style={styles.outOfText}>out of {totalRankers}</Text>
        <Ionicons name="medal" size={24} color="#FFD700" style={styles.medalIcon} />
      </View>
      <View style={styles.topRankers}>
        <Text style={styles.topRankersText}>Top Rankers</Text>
        <FlatList
          data={topRankersData}
          renderItem={renderTopRankerItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  myRanking: {
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  myRankingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333333',
  },
  myRank: {
    fontSize: 40,
    fontWeight:"bold",
    marginRight: 5,
    marginTop:30,
    color: '#333333',
  },
  outOfText: {
    fontSize: 18,
    color: '#666666',
  },
  topRankers: {
    flex: 1,
  },
  topRankersText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  rankerItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 4,
    padding: 10,
  },
  rankerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  rankerName: {
    fontSize: 16,
    color: '#333333',
  },
  medalIcon: {
    marginLeft: 5,
  },
  serialNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  serialNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default MyRankingPage;
