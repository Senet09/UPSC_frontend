import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CheckoutPage = () => {
    const subtotal = 200; // Example subtotal amount
    const shippingCost = 8; // Example shipping cost
    const tax = 0; // Example tax amount
    const total = subtotal + shippingCost + tax; // Calculate total

    return (
        <ScrollView style={styles.container}>
            {/* Back Button */}


            {/* Shipping Address */}
            <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>Add Shipping Address</Text>
            </TouchableOpacity>

            {/* Payment Method */}
            <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>Add Payment Method</Text>
            </TouchableOpacity>

            {/* Price Summary */}
            <View style={styles.priceSummaryContainer}>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Subtotal</Text>
                    <Text style={styles.priceValue}>${subtotal}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Shipping Cost</Text>
                    <Text style={styles.priceValue}>${shippingCost}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Tax</Text>
                    <Text style={styles.priceValue}>${tax}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>${total}</Text>
                </View>
            </View>

            {/* Place Order Button */}
            <TouchableOpacity style={styles.placeOrderButton}>
                <Text style={styles.placeOrderText}>Place Order</Text>
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
    backButton: {
        paddingVertical: 16,
    },
    backButtonText: {
        fontSize: 24,
        color: '#000',
    },
    optionButton: {
        backgroundColor: '#f7f7f7',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    optionText: {
        fontSize: 18,
        color: '#000',
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
    placeOrderButton: {
        backgroundColor: '#5a67d8',
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    placeOrderText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default CheckoutPage;
