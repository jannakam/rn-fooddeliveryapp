import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from '../constants/colors';

const OrderHistory = () => {
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
      ],
      trackingSteps: [
        { title: 'Order Confirmed', completed: true },
        { title: 'Preparing', completed: true },
        { title: 'On the Way', completed: true },
        { title: 'Delivered', completed: false }
      ]
    }
  ];

  const renderTrackingSteps = (steps) => (
    <View style={styles.trackingContainer}>
      {steps.map((step, index) => (
        <View key={index} style={styles.trackingStep}>
          <View style={[
            styles.stepIndicator,
            step.completed ? styles.stepCompleted : styles.stepPending
          ]}>
            <MaterialIcons
              name={step.completed ? "check" : "schedule"}
              size={16}
              color={step.completed ? COLORS.WHITE : COLORS.SECONDARY}
            />
          </View>
          <Text style={[
            styles.stepText,
            step.completed ? styles.stepTextCompleted : styles.stepTextPending
          ]}>
            {step.title}
          </Text>
          {index < steps.length - 1 && (
            <View style={[
              styles.stepLine,
              step.completed ? styles.stepLineCompleted : styles.stepLinePending
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
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

      {item.status === 'In Transit' && item.trackingSteps && (
        renderTrackingSteps(item.trackingSteps)
      )}
      
      <View style={styles.orderFooter}>
        <Text style={styles.totalText}>Total: {item.total.toFixed(2)} KWD</Text>
        <MaterialIcons name="receipt" size={24} color={COLORS.SECONDARY} />
      </View>
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
    marginBottom: 15,
    shadowColor: COLORS.SHADOW,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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
    marginTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
  trackingContainer: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  trackingStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepCompleted: {
    backgroundColor: COLORS.ACCENT,
  },
  stepPending: {
    backgroundColor: COLORS.BACKGROUND_LIGHT_TRANSPARENT,
    borderWidth: 1,
    borderColor: COLORS.SECONDARY,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  stepTextCompleted: {
    color: COLORS.PRIMARY,
  },
  stepTextPending: {
    color: COLORS.SECONDARY,
  },
  stepLine: {
    position: 'absolute',
    left: 12,
    top: 24,
    width: 2,
    height: 20,
  },
  stepLineCompleted: {
    backgroundColor: COLORS.ACCENT,
  },
  stepLinePending: {
    backgroundColor: COLORS.BACKGROUND_LIGHT_TRANSPARENT,
  },
});

export default OrderHistory; 