import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const CartPage = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([
        {
            id: '1',
            name: "To Kill a Mockingbird",
            author: 'Harper Lee',
            price: 14.99,
            quantity: 1,
            image: { uri: "https://covers.openlibrary.org/b/id/8225266-L.jpg" },
        },
    ]);

    const handleIncreaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecreaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const shippingCost = 8.0; // Static shipping cost
        const tax = 0.0; // Static tax
        return subtotal + shippingCost + tax;
    };

    return (
        <ScrollView style={styles.container}>
            {/* Cart Items */}
            <View style={styles.cartContainer}>
                <Text style={styles.cartTitle}>Cart</Text>
                <TouchableOpacity style={styles.removeAllButton}>
                    <Text style={styles.removeAllText}>Remove All</Text>
                </TouchableOpacity>
            </View>

            {cartItems.map(item => (
                <View key={item.id} style={styles.cartItem}>
                    <Image source={item.image} style={styles.cartItemImage} />
                    <View style={styles.cartItemDetails}>
                        <Text style={styles.cartItemName}>{item.name}</Text>
                        <Text style={styles.cartItemAuthor}>Author - {item.author}</Text>
                        <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecreaseQuantity(item.id)}>
                                <Text style={styles.quantityText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityValue}>{item.quantity}</Text>
                            <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncreaseQuantity(item.id)}>
                                <Text style={styles.quantityText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))}

            {/* Price Summary */}
            <View style={styles.priceSummaryContainer}>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Subtotal</Text>
                    <Text style={styles.priceValue}>${calculateSubtotal().toFixed(2)}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Shipping Cost</Text>
                    <Text style={styles.priceValue}>$8.00</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Tax</Text>
                    <Text style={styles.priceValue}>$0.00</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
                </View>
            </View>

            {/* Coupon Code */}
            <View style={styles.couponContainer}>
                <TextInput
                    style={styles.couponInput}
                    placeholder="Enter Coupon Code"
                />
                <TouchableOpacity style={styles.couponButton}>
                    <Text style={styles.couponButtonText}>{'>'}</Text>
                </TouchableOpacity>
            </View>

            {/* Checkout Button */}
            <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate("Checkout")}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    cartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cartTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    removeAllButton: {
        paddingVertical: 8,
    },
    removeAllText: {
        fontSize: 16,
        color: '#ff0000',
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cartItemImage: {
        width: 80,
        height: 120,
        borderRadius: 8,
        marginRight: 16,
    },
    cartItemDetails: {
        flex: 1,
    },
    cartItemName: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 4,
    },
    cartItemAuthor: {
        fontSize: 16,
        color: '#888',
        marginBottom: 8,
    },
    cartItemPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    priceSummaryContainer: {
        marginVertical: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    priceLabel: {
        fontSize: 16,
        color: '#888',
    },
    priceValue: {
        fontSize: 16,
        color: '#000',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '600',
    },
    couponContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    couponInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginRight: 8,
    },
    couponButton: {
        backgroundColor: '#5a67d8',
        padding: 12,
        borderRadius: 8,
    },
    couponButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    checkoutButton: {
        backgroundColor: '#5a67d8',
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    checkoutButtonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default CartPage;
