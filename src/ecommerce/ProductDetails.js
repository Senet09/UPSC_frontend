import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ProductDetailsPage = ({ navigation }) => {
    const [quantity, setQuantity] = useState(1);

    const reviews = [
        {
            id: '1',
            name: 'Alex Morgan',
            rating: 4.5,
            comment: 'A captivating read with a gripping storyline. Highly recommended!',
            time: '3 days ago',
        },
        {
            id: '2',
            name: 'Chris Evans',
            rating: 4.0,
            comment: 'Well-written and engaging. Enjoyed every bit of it.',
            time: '5 days ago',
        },
    ];

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const renderHeader = () => (
        <View>
            {/* Product Images */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: "https://covers.openlibrary.org/b/id/8225266-L.jpg" }} style={styles.productImage} />
                {/* You can add more images if needed */}
            </View>

            {/* Product Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.productTitle}>To Kill a Mockingbird</Text>
                <Text style={styles.productPrice}>$14.99</Text>

                {/* Quantity Selector */}
                <Text style={styles.sectionTitle}>Quantity</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton} onPress={handleDecreaseQuantity}>
                        <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityValue}>{quantity}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={handleIncreaseQuantity}>
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Product Description */}
                <Text style={styles.productDescription}>
                    Published in 1960, "To Kill a Mockingbird" is a classic of modern American literature,
                    offering a powerful and evocative portrayal of racial injustice in the Deep South.
                </Text>

                {/* Shipping & Returns */}
                <Text style={styles.sectionTitle}>Shipping & Returns</Text>
                <Text style={styles.productDescription}>
                    Free standard shipping and free 30-day returns.
                </Text>
            </View>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.footerContainer}>
            <Text style={styles.totalPrice}>${(14.99 * quantity).toFixed(2)}</Text>
            <TouchableOpacity style={styles.addToBagButton} onPress={() => navigation.navigate("Cart")}>
                <Text style={styles.addToBagButtonText}>Add to Bag</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.reviewContainer}>
            <Text style={styles.reviewName}>{item.name}</Text>
            <Text style={styles.reviewRating}>⭐ {item.rating}</Text>
            <Text style={styles.reviewComment}>{item.comment}</Text>
            <Text style={styles.reviewTime}>{item.time}</Text>
        </View>
    );

    return (
        <FlatList
            data={reviews}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 16,
    },
    productImage: {
        width: 150,
        height: 200,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    infoContainer: {
        paddingHorizontal: 16,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 20,
        fontWeight: '600',
        color: '#888',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    quantityButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
    },
    quantityText: {
        fontSize: 18,
    },
    quantityValue: {
        fontSize: 18,
        marginHorizontal: 16,
    },
    productDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 16,
    },
    ratingText: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 8,
    },
    reviewCount: {
        fontSize: 14,
        color: '#888',
        marginBottom: 16,
    },
    reviewContainer: {
        marginBottom: 16,
        marginHorizontal: 12,

    },
    reviewName: {
        fontSize: 16,
        fontWeight: '600',
    },
    reviewRating: {
        fontSize: 16,
        color: '#555',
    },
    reviewComment: {
        fontSize: 14,
        color: '#777',
        marginVertical: 4,
    },
    reviewTime: {
        fontSize: 12,
        color: '#aaa',
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: '600',
    },
    addToBagButton: {
        backgroundColor: '#5a67d8',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    addToBagButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
});

export default ProductDetailsPage;
