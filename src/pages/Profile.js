import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const ProfilePage = () => {
  const navigation = useNavigation();

  const addresses = [
    {
      id: 1,
      name: 'Home',
      street: '123 Al Salem Street',
      area: 'Salmiya',
      block: 'Block 12',
      building: 'Building 45',
    },
    {
      id: 2,
      name: 'Work',
      street: '456 Kuwait City Avenue',
      area: 'Sharq',
      block: 'Block 3',
      building: 'Tower 789',
    }
  ];

  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242' },
    { id: 2, type: 'Mastercard', last4: '8888' }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      {/* User Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Name:</Text>
          <View style={styles.editable}>
            <Text style={styles.value}>Janna Almuqaisib</Text>
            <MaterialIcons name="edit" size={20} color={COLORS.ACCENT} />
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email:</Text>
          <View style={styles.editable}>
            <Text style={styles.value}>janna@gmail.com</Text>
            <MaterialIcons name="edit" size={20} color={COLORS.ACCENT} />
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Phone:</Text>
          <View style={styles.editable}>
            <Text style={styles.value}>+965 9449 9371</Text>
            <MaterialIcons name="edit" size={20} color={COLORS.ACCENT} />
          </View>
        </View>
      </View>

      {/* Addresses */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Delivery Addresses</Text>
          <TouchableOpacity>
            <MaterialIcons name="add" size={24} color={COLORS.ACCENT} />
          </TouchableOpacity>
        </View>
        {addresses.map((address) => (
          <View key={address.id} style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Text style={styles.addressName}>{address.name}</Text>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={20} color={COLORS.ACCENT} />
              </TouchableOpacity>
            </View>
            <Text style={styles.addressText}>{address.street}</Text>
            <Text style={styles.addressText}>{address.area}, {address.block}</Text>
            <Text style={styles.addressText}>{address.building}</Text>
          </View>
        ))}
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <TouchableOpacity>
            <MaterialIcons name="add" size={24} color={COLORS.ACCENT} />
          </TouchableOpacity>
        </View>
        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.paymentCard}>
            <View style={styles.paymentInfo}>
              <MaterialIcons 
                name={method.type.toLowerCase() === 'visa' ? 'credit-card' : 'credit-card'} 
                size={24} 
                color={COLORS.SECONDARY} 
              />
              <Text style={styles.value}>{method.type} **** {method.last4}</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="edit" size={20} color={COLORS.ACCENT} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Order History Button */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('OrderHistory')}
      >
        <Text style={styles.buttonText}>View Order History</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={[styles.button, styles.logoutButton]}>
        <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: COLORS.BACKGROUND,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.PRIMARY,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    shadowColor: COLORS.SHADOW,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: COLORS.SECONDARY,
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: COLORS.SECONDARY,
  },
  editable: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  addressCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    marginBottom: 10,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.SECONDARY,
    marginBottom: 2,
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: COLORS.BACKGROUND,
    borderWidth: 1,
    borderColor: COLORS.SECONDARY,
    marginTop: 5,
  },
  logoutText: {
    color: COLORS.SECONDARY,
  },
});
