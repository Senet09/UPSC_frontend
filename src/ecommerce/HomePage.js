import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const categories = [
    { id: '1', title: 'Fiction', image: { uri: 'https://images.unsplash.com/photo-1512820790803-83ca734da794' } },
    { id: '2', title: 'Science', image: { uri: 'https://images.unsplash.com/photo-1532012197267-da84d127e765' } },
    { id: '3', title: 'History', image: { uri: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4' } },
    { id: '4', title: 'Philosophy', image: { uri: 'https://images.unsplash.com/photo-1512820790803-83ca734da794' } },
    { id: '5', title: 'Art', image: { uri: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1' } },
];

const topSelling = [
    {
        id: '1',
        title: "The Great Gatsby",
        price: '$10.99',
        image: { uri: 'https://images.unsplash.com/photo-1556761175-4b46a572b786' }
    },
    {
        id: '2',
        title: "Sapiens: A Brief History of Humankind",
        price: '$12.50',
        originalPrice: '$18.00',
        image: { uri: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672' }
    },
    {
        id: '3',
        title: "1984",
        price: '$14.99',
        originalPrice: '$20.00',
        image: { uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f' }
    },
    {
        id: '4',
        title: "To Kill a Mockingbird",
        price: '$11.99',
        originalPrice: '$15.99',
        image: { uri: 'https://images.unsplash.com/photo-1532012197267-da84d127e765' }
    },
    {
        id: '5',
        title: "Pride and Prejudice",
        price: '$13.49',
        originalPrice: '$16.99',
        image: { uri: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672' }
    },
    {
        id: '6',
        title: "The Catcher in the Rye",
        price: '$9.99',
        originalPrice: '$14.99',
        image: { uri: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c' }
    },
    {
        id: '7',
        title: "Moby Dick",
        price: '$8.99',
        originalPrice: '$12.50',
        image: { uri: 'https://images.unsplash.com/photo-1573496782181-0e5c2d4b4010' }
    },
    {
        id: '8',
        title: "The Hobbit",
        price: '$15.99',
        originalPrice: '$22.00',
        image: { uri: 'https://images.unsplash.com/photo-1532012197267-da84d127e765' }
    },
    {
        id: '9',
        title: "War and Peace",
        price: '$19.99',
        originalPrice: '$25.00',
        image: { uri: 'https://images.unsplash.com/photo-1532614338840-08189c0e75f4' }
    },
]

const HomePageEcommerce = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Book Store</Text>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Cart")}>
                    <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/shopping-cart.png' }} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Text style={styles.searchText}>Search for books...</Text>
            </View>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
                <View style={styles.categoriesHeader}>
                    <Text style={styles.sectionTitle}>Shop by Categories</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Categories")}>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    data={categories}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.categoryItem}>
                            <Image source={item.image} style={styles.categoryImage} />
                            <Text style={styles.categoryText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
                <FlatList
                    horizontal
                    data={categories}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.categoryItem}>
                            <Image source={item.image} style={styles.categoryImage} />
                            <Text style={styles.categoryText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            {/* Top Selling */}
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Top Selling</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    data={topSelling}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.productItem}>
                            <Image source={item.image} style={styles.productImage} />
                            <Text style={styles.productTitle}>{item.title}</Text>
                            <Text style={styles.productPrice}>{item.price}</Text>
                            {item.originalPrice && <Text style={styles.productOriginalPrice}>{item.originalPrice}</Text>}
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>New In</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    data={topSelling}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.productItem}>
                            <Image source={item.image} style={styles.productImage} />
                            <Text style={styles.productTitle}>{item.title}</Text>
                            <Text style={styles.productPrice}>{item.price}</Text>
                            {item.originalPrice && <Text style={styles.productOriginalPrice}>{item.originalPrice}</Text>}
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
    },
    iconButton: {
        padding: 8,
    },
    icon: {
        width: 24,
        height: 24,
    },
    searchContainer: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        marginVertical: 16,
    },
    searchText: {
        color: '#777',
        fontSize: 16,
    },
    categoriesContainer: {
        marginVertical: 16,
    },
    categoriesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    seeAllText: {
        color: '#007BFF',
        fontSize: 16,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 16,
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 3,
    },
    categoryImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#333',
    },
    sectionContainer: {
        marginVertical: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    productItem: {
        width: 150,
        marginRight: 16,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 3,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#f1f1f1',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    productPrice: {
        fontSize: 16,
        color: '#e91e63',
        marginTop: 4,
    },
    productOriginalPrice: {
        fontSize: 14,
        color: '#aaa',
        textDecorationLine: 'line-through',
        marginTop: 2,
    },
});

export default HomePageEcommerce;
