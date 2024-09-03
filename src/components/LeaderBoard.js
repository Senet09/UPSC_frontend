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

const MyRankingPage = () => {
    // Sample data for your own ranking
    const myRanking = { rank: 5 };

    const renderTopRankerItem = ({ item }) => {
        let crownIcon;
        if (item.rank === 1) {
            crownIcon = <Ionicons name="ribbon" size={20} color="gold" style={styles.crownIcon} />;
        } else if (item.rank === 2) {
            crownIcon = <Ionicons name="ribbon" size={20} color="silver" style={styles.crownIcon} />;
        } else if (item.rank === 3) {
            crownIcon = <Ionicons name="ribbon" size={20} color="brown" style={styles.crownIcon} />;
        } else {
            crownIcon = (
                <View style={styles.serialNumberContainer}>
                    <Text style={styles.serialNumber}>{item.rank}</Text>
                </View>
            );
        }

        return (
            <View style={styles.rankerItem}>
                <View style={styles.rankerDetails}>
                    {crownIcon}
                    <View style={styles.nameContainer}>
                        <Text style={styles.rankerName}>{item.name}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.topTriangle}>
             
                <View style={styles.topNames}>

                  <View style={styles.tri}>
            <Ionicons name="ribbon" size={50} color="silver" style={styles.crownIcon} />
            
            
                    <Text style={styles.name}>Priya Sharma</Text>
                    </View>
                    <View style={styles.tri}>

                    <Ionicons name="ribbon" size={80} color="gold" style={styles.crownIcon} />
                    <Text style={styles.name}>Ravi Patel</Text>
                  </View>
                  <View style={styles.tri}>
                    <Ionicons name="ribbon" size={50} color="brown" style={styles.crownIcon} />
                    <Text style={styles.name}>Suresh Singh</Text>
                    </View>
                </View>
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
        backgroundColor: '#FFFFFF',
        padding:10
    },
    topTriangle: {
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
    },
    tri:{
flexDirection:"column",
alignItems:"center",

    }
    ,
    triangle: {
        position: 'absolute',
        top: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 150,
        borderRightWidth: 150,
        borderBottomWidth: 100,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
    },
    topNames: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 10,
    },
    name: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    topRankers: {
        flex: 1,
        marginTop: 50,
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
    crownIcon: {
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
