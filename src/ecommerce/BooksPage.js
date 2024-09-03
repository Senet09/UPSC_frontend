import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';

const subcategories = [
    'All', 'Ancient History', 'Medieval History', 'Modern History'
];

const booksData = [
    {
        id: '1',
        title: "The Great Gatsby",
        price: '$10.00',
        subcategory: 'Modern History',
        image: { uri: "https://images.unsplash.com/photo-1556761175-4b46a572b786" },
    },
    {
        id: '2',
        title: 'To Kill a Mockingbird',
        price: '$12.97',
        subcategory: 'Modern History',
        image: { uri: "https://images.unsplash.com/photo-1532012197267-da84d127e765" },
    },
    {
        id: '3',
        title: '1984 by George Orwell',
        price: '$15.00',
        subcategory: 'Modern History',
        image: { uri: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f" },
    },
    {
        id: '4',
        title: "Pride and Prejudice",
        price: '$14.97',
        subcategory: 'Ancient History',
        image: { uri: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672" },
    },
    {
        id: '5',
        title: "Sapiens: A Brief History of Humankind",
        price: '$16.99',
        subcategory: 'Modern History',
        image: { uri: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672" },
    },
    {
        id: '6',
        title: "The Silk Roads: A New History of the World",
        price: '$18.00',
        subcategory: 'Ancient History',
        image: { uri: "https://images.unsplash.com/photo-1582843769551-7cf18c674bd1" },
    },
    {
        id: '7',
        title: "Guns, Germs, and Steel",
        price: '$14.50',
        subcategory: 'Medieval History',
        image: { uri: "https://images.unsplash.com/photo-1599412226325-b3390cfcf8e7" },
    },
    {
        id: '8',
        title: "The Diary of a Young Girl",
        price: '$11.99',
        subcategory: 'Modern History',
        image: { uri: "https://images.unsplash.com/photo-1566417933-bb8077e5e978" },
    },
];

const BooksPage = ({ navigation }) => {
    const [selectedSubcategory, setSelectedSubcategory] = useState('All');

    const filteredBooks = booksData.filter(book =>
        selectedSubcategory === 'All' || book.subcategory === selectedSubcategory
    );

    return (
        <View style={styles.container}>
            {/* Filter Bar */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
                {subcategories.map(subcat => (
                    <TouchableOpacity
                        key={subcat}
                        style={[
                            styles.filterButton,
                            selectedSubcategory === subcat && styles.selectedFilterButton,
                        ]}
                        onPress={() => setSelectedSubcategory(subcat)}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                selectedSubcategory === subcat && styles.selectedFilterButtonText,
                            ]}
                        >
                            {subcat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Books List */}
            <FlatList
                data={filteredBooks}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate("ProductDetails")}>
                        <Image source={item.image} style={styles.productImage} />
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.productPrice}>{item.price}</Text>
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
    },
    filterBar: {
        flexDirection: 'row',
        marginVertical: 16,
    },
    filterButton: {
        backgroundColor: '#fff',
        height: 50, // Height of the button
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedFilterButton: {
        backgroundColor: '#5a67d8',
        borderColor: '#5a67d8',
    },
    filterButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    selectedFilterButtonText: {
        color: '#fff',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    productItem: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        flex: 1,
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 4,
        color: '#666',
    },
});

export default BooksPage;
