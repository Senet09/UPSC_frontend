import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList,Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CoinWalletScreen = () => {
  const [userCoins, setUserCoins] = useState(100); // Initial user coins
  const [transactions, setTransactions] = useState([
    { id: '1', type: 'reward', amount: 50 },
    { id: '2', type: 'reward', amount: 30 },
    // Add more transactions as needed
  ]);

  const handleWithdraw = () => {
    // Add logic for withdrawing coins
    // For example, deducting coins and updating transactions
  };

  const handleBuyItem = () => {
    // Add logic for buying items with coins
    // For example, deducting coins and updating transactions
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Coin Wallet</Text>
   
      <View style={styles.walletInfo}>
        <Text style={styles.walletBalance}>Your Balance: {userCoins}</Text>
        <Image source={require('../../assets/icons/coin.png')} style={styles.coinIcon}/>
        <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
          <Ionicons name="arrow-down-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionContainer}>
            <Text style={styles.transactionType}>{item.type}</Text>
            <Text style={styles.transactionAmount}>{item.amount} Coins</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.buyButton} onPress={handleBuyItem}>
        <Ionicons name="cart-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Buy Item</Text>
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
  walletInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletBalance: {
    fontSize: 18,
  },
  withdrawButton: {
    flexDirection: 'row',
    backgroundColor: '#00008b',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 16,
  },
  buyButton: {
    flexDirection: 'row',
    backgroundColor: '#00008b',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinIcon: {
    width: 24,
    height: 24,
    marginRight:90
  },
});

export default CoinWalletScreen;
