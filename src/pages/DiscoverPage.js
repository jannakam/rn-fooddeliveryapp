import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import restaurants from "../data/restaurants";
import MenuItemCard from "../components/MenuItemCard";
import COLORS from "../constants/colors";

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeKeyword, setActiveKeyword] = useState("All");

  // Extract unique categories and add 'All' at the beginning
  const uniqueCategories = ["All", ...new Set(restaurants.map((restaurant) => restaurant.category))];

  // Initialize with all items
  useEffect(() => {
    handleSearch("All");
  }, []);

  // Perform search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveKeyword(query);

    if (query === "All") {
      // Show all menu items when 'All' is selected
      const allResults = [];
      restaurants.forEach((restaurant) => {
        restaurant.menuItems.forEach((item) => {
          allResults.push({ ...item, restaurant });
        });
      });
      setFilteredResults(allResults);
      return;
    }

    // Filter restaurants and menu items by category or menu item name
    const results = [];
    restaurants.forEach((restaurant) => {
      if (restaurant.category === query) {
        // Add all menu items from matching category
        restaurant.menuItems.forEach((item) => {
          results.push({ ...item, restaurant });
        });
      } else if (
        restaurant.menuItems.some((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      ) {
        // Add matching menu items with restaurant info
        restaurant.menuItems.forEach((item) => {
          if (item.name.toLowerCase().includes(query.toLowerCase())) {
            results.push({ ...item, restaurant });
          }
        });
      }
    });

    setFilteredResults(results);
  };

  // Render keyword labels
  const renderKeywordLabels = () => {
    return uniqueCategories.map((category, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.keywordLabel,
          activeKeyword === category ? styles.activeKeyword : styles.inactiveKeyword
        ]}
        onPress={() => handleSearch(category)}
      >
        <Text 
          style={[
            styles.keywordText,
            activeKeyword === category ? styles.activeKeywordText : styles.inactiveKeywordText
          ]}
        >
          {category}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="grey" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for restaurants or food..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Keyword Labels */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.keywordsContainer}
      >
        {renderKeywordLabels()}
      </ScrollView>

      {/* Search Results */}
      <FlatList
        data={filteredResults}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <MenuItemCard
              menuItem={{
                ...item,
                namewithRestaurant: `${item.name} (${item.restaurant.name})`,
              }}
            />
          </View>
        )}
        contentContainerStyle={[
          styles.resultsContainer,
          filteredResults.length === 0 && styles.emptyContainer
        ]}
        ListEmptyComponent={
          searchQuery ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.noResults}>No results found.</Text>
            </View>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.noResults}>
                Search for restaurants or food items!
              </Text>
            </View>
          )
        }
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default DiscoverPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: COLORS.SHADOW,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: COLORS.TEXT_PRIMARY,
  },
  keywordsContainer: {
    marginBottom: 20,
    height: 40,
  },
  keywordLabel: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  activeKeyword: {
    backgroundColor: COLORS.ACCENT,
  },
  inactiveKeyword: {
    backgroundColor: COLORS.BLACK + '60',
    // borderWidth: 1,
    // borderColor: COLORS.SECONDARY + '60',
    // shadowColor: COLORS.MUTED,
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // shadowOffset: { width: 0, height: 1 },
  },
  keywordText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  activeKeywordText: {
    color: COLORS.WHITE,
  },
  inactiveKeywordText: {
    color: COLORS.SECONDARY + '80', // 80 is for opacity
  },
  resultsContainer: {
    paddingHorizontal: 5,
    flexGrow: 1,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  gridItem: {
    flex: 0.5, 
    margin: 5,
  },
  emptyStateContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResults: {
    textAlign: "center",
    color: COLORS.SECONDARY,
    fontSize: 16,

  },
  row: {
    justifyContent: "space-between", // Ensure items are evenly distributed
  },
});
