import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import renderStars from './renderStars';
import { Feather } from '@expo/vector-icons';
const RestaurantCard = ({ restaurant }) => {
  // Generate random number of reviews
  const randomReviews = Math.floor(Math.random() * 500) + 50;


  // Determine the tag color
  const getTagStyle = (rating) => {
    if (rating > 4.5) return { color: 'seagreen' };
    if (rating > 4) return { color: 'goldenrod' };
    if (rating > 3) return { color: 'orangered' };
    if (rating > 2) return { color: 'firebrick' };
    return { color: 'darkred' };
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <View style={{backgroundColor: getTagStyle(restaurant.rating).color, borderRadius: 15, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start',}}>
            <Text style={styles.rating}>{restaurant.rating}</Text>
          </View>
        </View>
        <Text style={styles.category}>
          {restaurant.category}
        </Text>
        <View style={styles.row}>
          {renderStars(restaurant.rating)}
          <Text style={styles.reviews}> ({randomReviews} reviews)</Text>
        </View>
        <View style={styles.row}>
          <Feather name="clock" size={14} color="#ae445a" />
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
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 4 },
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
    resizeMode: 'contain',
  },
  info: {
    paddingLeft: 10,
    flex: 1, // Ensures content doesn't overflow the card
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: "#4b4376"
  },
  ratingBadge: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  rating: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tag: {
    fontSize: 12,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviews: {
    marginLeft: 5,
    color: '#4b4376',
    fontSize: 12,
  },
  deliveryTime: {
    fontSize: 12,
    color: '#ae445a',
  },
  category: {
    fontSize: 12,
    color: '#4b4376',
    marginVertical: 5,
  },
});
