import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import renderStars from './renderStars';
import { MaterialIcons } from '@expo/vector-icons'; // For delivery time icon

const RestaurantCard = ({ restaurant }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <View style={styles.row}>
          <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        </View>
        <View style={styles.row}>
          {renderStars(restaurant.rating)}
          <Text style={styles.rating}>{restaurant.rating}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="delivery-dining" size={16} color="grey" />
          <Text style={styles.deliveryTime}> {restaurant.deliveryTime}</Text>
        </View>
      </View>
    </View>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  info: {
    paddingLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cuisine: {
    fontSize: 14,
    color: 'grey',
  },
  deliveryTime: {
    fontSize: 14,
    color: 'grey',
  },
  rating: {
    marginLeft: 5,
    color: 'goldenrod',
    fontSize: 12,
  },
});
