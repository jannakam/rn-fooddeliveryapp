import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from '../constants/colors';
import MapView, { Marker } from 'react-native-maps';

const OrderHistory = ({ navigation }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock delivery location - replace with actual tracking data
  const deliveryLocation = {
    latitude: 29.3759,
    longitude: 47.9774,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Mock orders - in a real app, this would come from a backend/context
  const orders = [
    {
      id: '1',
      date: '2024-01-15',
      total: 15.50,
      status: 'Delivered',
      items: [
        { name: 'Burger', quantity: 2, price: 5.25 },
        { name: 'Fries', quantity: 1, price: 5.00 }
      ]
    },
    {
      id: '2',
      date: '2024-01-14',
      total: 22.75,
      status: 'In Transit',
      items: [
        { name: 'Pizza', quantity: 1, price: 12.75 },
        { name: 'Salad', quantity: 1, price: 10.00 }
      ]
    }
  ];

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => setSelectedOrder(item)}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderDate}>Order Date: {item.date}</Text>
        <Text style={[
          styles.orderStatus,
          { color: item.status === 'Delivered' ? COLORS.ACCENT : COLORS.SECONDARY }
        ]}>
          {item.status}
        </Text>
      </View>
      
      <View style={styles.orderItems}>
        {item.items.map((orderItem, index) => (
          <Text key={index} style={styles.itemText}>
            {orderItem.quantity}x {orderItem.name} - {orderItem.price.toFixed(2)} KWD
          </Text>
        ))}
      </View>
      
      <View style={styles.orderFooter}>
        <Text style={styles.totalText}>Total: {item.total.toFixed(2)} KWD</Text>
        <MaterialIcons name="chevron-right" size={24} color={COLORS.SECONDARY} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      
      {selectedOrder && selectedOrder.status === 'In Transit' && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={deliveryLocation}
          >
            <Marker
              coordinate={{
                latitude: deliveryLocation.latitude,
                longitude: deliveryLocation.longitude,
              }}
              title="Delivery Location"
            />
          </MapView>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedOrder(null)}
          >
            <MaterialIcons name="close" size={24} color={COLORS.SECONDARY} />
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: COLORS.BACKGROUND,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.PRIMARY,
  },
  listContainer: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: COLORS.SHADOW,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.PRIMARY,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  orderItems: {
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
    color: COLORS.SECONDARY,
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
  mapContainer: {
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    shadowColor: COLORS.SHADOW,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default OrderHistory; 