import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const products = [
  {
    id: 1,
    title: 'Ancient History',
    price: '$19.99',
    image: 'https://th.bing.com/th?id=OPA.GGwwb1r%2bm5LHwA474C474&w=592&h=550&o=5&pid=21.1',
    description: 'Dive into the fascinating world of ancient civilizations with this comprehensive book on Ancient History. Uncover the mysteries of the past, from the rise and fall of empires to the daily lives of people in bygone eras.',
  },
  {
    id: 2,
    title: 'Indian Polity',
    price: '$29.99',
    image: 'https://www.ingramspark.com/hs-fs/hubfs/One%20Wilde%20Night%20003.jpg?width=375&name=One%20Wilde%20Night%20003.jpg',
    description: 'Explore the intricacies of Indian politics with this insightful book on Indian Polity. From the constitutional framework to the functioning of the government, gain a deeper understanding of the political landscape of India.',
  },
  {
    id: 3,
    title: 'The Great Adventure',
    price: '$14.99',
    image: 'https://www.ingramspark.com/hs-fs/hubfs/InPursuitofGrit_cover4.jpeg?width=375&name=InPursuitofGrit_cover4.jpeg',
    description: 'Embark on a thrilling journey filled with mystery and discovery in "The Great Adventure." Join the protagonists as they unravel secrets, solve puzzles, and face challenges in a quest that will keep you on the edge of your seat.',
  },
  {
    id: 4,
    title: 'Secrets of the Cosmos',
    price: '$24.99',
    image: 'https://www.ingramspark.com/hs-fs/hubfs/BeforetheRipcordBroke_cover1.jpg?width=375&name=BeforetheRipcordBroke_cover1.jpg',
    description: 'Embark on a cosmic journey and explore the wonders of the universe in "Secrets of the Cosmos." From the birth of stars to the mysteries of dark matter, this captivating book delves into the awe-inspiring realms of space and time.',
  },
];


const ProductListingPage = ({ navigation }) => {
  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const ProductDetailPage = ({ route, navigation }) => {

  const { product } = route.params;

  const handleAddToCart = () => {
    // Implement Add to Cart functionality, e.g., add the product to the cart
    console.log(`Added ${product.title} to the cart.`);
  };

  const handleBuyNow = () => {
    // Implement Buy Now functionality, e.g., navigate to a checkout page
    navigation.navigate('Checkout', { product });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBuyNow}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  productItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 14,
    marginTop: 10,
    color:"#000000"
  },
  button: {
    backgroundColor: '#000099',
    padding: 16,
    borderRadius: 25,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { ProductListingPage, ProductDetailPage };
