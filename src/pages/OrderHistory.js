import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from '../constants/colors';
import MapView, { Marker } from 'react-native-maps';

const OrderHistory = ({ navigation }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Mock delivery location - replace with actual tracking data
  const deliveryLocation = {
    latitude: 29.359115,
    longitude: 47.906783,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Mock orders with progress steps - in a real app, this would come from a backend/context
  const orders = [
    {
      id: '1',
      date: '2024-01-15',
      total: 15.50,
      status: 'In Progress',
      items: [
        { name: 'Spring Rolls', quantity: 2, price: 5.25 },
        { name: 'Pasta', quantity: 1, price: 5.00 }
      ],
      progress: [
        { step: 'Order Placed', time: '10:30 AM', completed: true },
        { step: 'Preparing', time: '10:35 AM', completed: true },
        { step: 'Out for Delivery', time: '10:50 AM', completed: true },
        { step: 'Delivered', time: '', completed: false }
      ]
    },
    {
      id: '2',
      date: '2024-01-14',
      total: 22.75,
      status: 'Delivered',
      items: [
        { name: 'Pizza', quantity: 1, price: 12.75 },
        { name: 'Machboos', quantity: 1, price: 10.00 }
      ],
      progress: [
        { step: 'Order Placed', time: '2:30 PM', completed: true },
        { step: 'Preparing', time: '2:35 PM', completed: true },
        { step: 'Out for Delivery', time: '2:50 PM', completed: true },
        { step: 'Delivered', time: '3:15 PM', completed: true }
      ]
    },
    {
      id: '3',
      date: '2024-01-13',
      total: 18.25,
      status: 'Delivered',
      items: [
        { name: 'Tiramisu', quantity: 2, price: 8.25 },
        { name: 'Beef Tacos', quantity: 2, price: 1.00 }
      ],
      progress: [
        { step: 'Order Placed', time: '7:30 PM', completed: true },
        { step: 'Preparing', time: '7:35 PM', completed: true },
        { step: 'Out for Delivery', time: '7:50 PM', completed: true },
        { step: 'Delivered', time: '8:15 PM', completed: true }
      ]
    },
    {
      id: '4',
      date: '2024-01-12',
      total: 25.00,
      status: 'Delivered',
      items: [
        { name: 'Quesadillas', quantity: 2, price: 12.50 }
      ],
      progress: [
        { step: 'Order Placed', time: '1:30 PM', completed: true },
        { step: 'Preparing', time: '1:35 PM', completed: true },
        { step: 'Out for Delivery', time: '1:50 PM', completed: true },
        { step: 'Delivered', time: '2:15 PM', completed: true }
      ]
    }
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const renderProgressSteps = (progress) => (
    <View style={styles.progressContainer}>
      {progress.map((step, index) => (
        <View key={index} style={styles.progressStep}>
          <View style={styles.stepIndicator}>
            <View style={[styles.stepDot, step.completed && styles.completedDot]} />
            {index < progress.length - 1 && (
              <View style={[styles.stepLine, step.completed && styles.completedLine]} />
            )}
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepText}>{step.step}</Text>
            <Text style={styles.stepTime}>{step.time || '---'}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderOrderItem = ({ item }) => (
    <View>
      <TouchableOpacity 
        style={[
          styles.orderCard,
          { marginBottom: expandedOrder === item.id ? 0 : 15 }
        ]}
        onPress={() => {
          setExpandedOrder(expandedOrder === item.id ? null : item.id);
          setSelectedOrder(item);
        }}
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
          <MaterialIcons 
            name={expandedOrder === item.id ? "expand-less" : "expand-more"} 
            size={24} 
            color={COLORS.SECONDARY} 
          />
        </View>
      </TouchableOpacity>

      {expandedOrder === item.id && (
        <View style={styles.expandedContent}>
          {renderProgressSteps(item.progress)}
          {item.status !== 'Delivered' && (
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
            </View>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
    fontSize: 20,
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
  expandedContent: {
    backgroundColor: '#f8f8f8',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 15,
    padding: 15,
    shadowColor: COLORS.SHADOW,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressStep: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  stepIndicator: {
    width: 30,
    alignItems: 'center',
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ddd',
    borderWidth: 2,
    borderColor: '#fff',
  },
  completedDot: {
    backgroundColor: COLORS.ACCENT,
  },
  stepLine: {
    position: 'absolute',
    top: 12,
    left: 14,
    width: 2,
    height: '100%',
    backgroundColor: '#ddd',
  },
  completedLine: {
    backgroundColor: COLORS.ACCENT,
  },
  stepContent: {
    flex: 1,
    marginLeft: 10,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.PRIMARY,
  },
  stepTime: {
    fontSize: 12,
    color: COLORS.SECONDARY,
    marginTop: 2,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default OrderHistory; 