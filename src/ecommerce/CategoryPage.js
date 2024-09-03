import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const categories = [
    {
        id: '1',
        title: 'Fiction',
        image: { uri: "https://images.unsplash.com/photo-1512820790803-83ca734da794" },
    },
    {
        id: '2',
        title: 'Science',
        image: { uri: "https://images.unsplash.com/photo-1532012197267-da84d127e765" },
    },
    {
        id: '3',
        title: 'History',
        image: { uri: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4" },
    },
    {
        id: '4',
        title: 'Philosophy',
        image: { uri: "https://images.unsplash.com/photo-1532012197267-da84d127e765" },
    },
    {
        id: '5',
        title: 'Art',
        image: { uri: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1" },
    },
];

const CategoriesPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Explore by Categories</Text>

            {/* Categories List */}
            <FlatList
                data={categories}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate("Books")}>
                        <Image source={item.image} style={styles.categoryImage} />
                        <Text style={styles.categoryText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
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
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginVertical: 24,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    categoryImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
        backgroundColor: '#e0e0e0',
    },
    categoryText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
});

export default CategoriesPage;
