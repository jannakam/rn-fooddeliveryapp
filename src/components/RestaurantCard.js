import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RestaurantCard = ({ restaurant }) => {
  // Function to render stars based on the rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starType = i < Math.floor(rating)
        ? 'star'
        : i < Math.ceil(rating)
        ? 'star-half-full'
        : 'star-o';
      return <Icon key={i} name={starType} size={16} color="goldenrod" style={styles.star} />;
    });
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.text}>{restaurant.name}</Text>
        <View style={styles.rating}>
          {renderStars(restaurant.rating)}
        </View>
        <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
      </View>
    </View>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowRadius: 4,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    marginBottom: 15,
    width: "40%",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  info: {
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  star: {
    marginHorizontal: 2,
  },
  deliveryTime: {
    fontSize: 14,
    color: 'grey',
  },
});
