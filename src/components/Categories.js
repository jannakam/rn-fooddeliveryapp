import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import CategoryCard from "./CategoryCard";
import COLORS from "../constants/colors";
import { getAllCategories } from "../api/items";
import { useQuery } from "@tanstack/react-query";

const LoadingSkeleton = () => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {[1, 2, 3, 4].map((_, index) => (
        <View key={index} style={styles.skeletonContainer}>
          <View style={styles.skeletonImagePlaceholder} />
          <Animated.View
            style={[
              styles.skeletonCard,
              { opacity: fadeAnim }
            ]}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const Categories = ({ onSelectCategory, selectedCategory }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  useEffect(() => {
    if (data) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [data]);

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Error loading categories. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <Animated.View style={{ opacity: fadeAnim }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              {data?.map((category) => (
                <TouchableOpacity 
                  key={category._id} 
                  onPress={() => onSelectCategory(selectedCategory === category.name ? null : category.name)}
                >
                  <CategoryCard 
                    category={{
                      categoryName: category.name,
                      image: category.image
                    }}
                    isSelected={selectedCategory === category.name}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
    color: COLORS.WHITE,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 10,
    marginTop: 40,
    gap: 10,
  },
  message: {
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.WHITE,
    fontFamily: "OpenSans_400Regular",
  },
  skeletonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 13,
    marginRight: 10,
  },
  skeletonImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.BACKGROUND_LIGHT_TRANSPARENT,
    position: 'absolute',
    top: -27,
    zIndex: 1,
  },
  skeletonCard: {
    width: 130,
    height: 100,
    backgroundColor: COLORS.BACKGROUND_LIGHT_TRANSPARENT,
    borderRadius: 10,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
});
