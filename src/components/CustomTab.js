// CustomTabBar.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={[styles.tabButton, { borderBottomWidth: isFocused ? 2 : 0 }]}
                    >
                        <Text style={styles.tabButtonText}>{label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tabButton: {
        paddingVertical: 10,
    },
    tabButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default CustomTabBar;
