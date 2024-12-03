import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons"; // Import icons

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      {/* User Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Name:</Text>
          <View style={styles.editable}>
            <Text style={styles.value}>Janna Almuqaisib</Text>
            <MaterialIcons name="edit" size={20} color="#666" />
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email:</Text>
          <View style={styles.editable}>
            <Text style={styles.value}>janna@gmail.com</Text>
            <MaterialIcons name="edit" size={20} color="#666" />
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Phone:</Text>
          <View style={styles.editable}>
            <Text style={styles.value}>+965 9449 9371</Text>
            <MaterialIcons name="edit" size={20} color="#666" />
          </View>
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        <View style={styles.detailRow}>
          <Text style={styles.value}>Visa **** 1234</Text>
          <MaterialIcons name="edit" size={20} color="#666" />
        </View>
      </View>

      {/* Order History */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Order History</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "white",
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  editable: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  button: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "seagreen",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
