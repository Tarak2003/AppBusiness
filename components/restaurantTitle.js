import React from "react";
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

const RestaurantTitle = props => {
    return (
        <View>
            <Text style={styles.title}>{props.restaurantTitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        paddingTop: 60,
        paddingBottom: 45,
        color: 'black',
        fontWeight: '700'
    }
})

export default RestaurantTitle