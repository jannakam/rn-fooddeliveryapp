import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import renderStars from './renderStars';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getRestaurantById } from '../api/items';
import COLORS from '../constants/colors';

const RestaurantCard = ({ restaurant }) => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const randomReviews = Math.floor(Math.random() * 500) + 50;

  const handlePress = () => {
    // Start scale animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start(() => {
      navigation.navigate('MenuItem', { 
        restaurant: restaurant
      });
    });
  };

  const getTagStyle = (rating) => {
    if (rating > 4.5) return { color: 'seagreen' };
    if (rating > 4) return { color: 'goldenrod' };
    if (rating > 3) return { color: 'orangered' };
    if (rating > 2) return { color: 'firebrick' };
    return { color: 'darkred' };
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <Animated.View 
        style={[
          styles.card,
          {
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Animated.Image 
          source={{ uri: restaurant?.image }} 
          style={[
            styles.image,
            {
              transform: [{ scale: scaleAnim }]
            }
          ]} 
        />
        <View style={styles.info}>
          <View style={styles.topRow}>
            <Text style={styles.name}>{restaurant?.name}</Text>
            <View style={{
              backgroundColor: getTagStyle(restaurant?.rating).color, 
              borderRadius: 15, 
              paddingHorizontal: 8, 
              paddingVertical: 3, 
              alignSelf: 'flex-start',
            }}>
              <Text style={styles.rating}>{restaurant?.rating}</Text>
            </View>
          </View>
          <Text style={styles.category}>
            {restaurant?.category?.name}
          </Text>
          <View style={styles.row}>
            {renderStars(restaurant?.rating)}
            <Text style={styles.reviews}> ({randomReviews} reviews)</Text>
          </View>
          <View style={styles.row}>
            <Feather name="clock" size={14} color={COLORS.PRIMARY} />
            <Text style={styles.deliveryTime}> {restaurant?.deliveryTime}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 10,
    shadowColor: COLORS.SHADOW,
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
    flex: 1,
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
    color: COLORS.PRIMARY,
  },
  rating: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviews: {
    marginLeft: 5,
    color: COLORS.SECONDARY,
    fontSize: 12,
  },
  deliveryTime: {
    fontSize: 12,
    color: COLORS.PRIMARY,
  },
  category: {
    fontSize: 12,
    color: COLORS.SECONDARY,
    marginVertical: 5,
  },
});
