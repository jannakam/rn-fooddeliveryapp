import { Fragment, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView, ActivityIndicator } from "react-native";
import AuthNavigation from "./src/navigation/AuthNav/AuthNavigation";
import HomeNavigation from "./src/navigation/HomeNav/HomeNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./src/context/CartContext";
import { CategoryProvider } from "./src/context/CategoryContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider, useUser } from "./src/context/UserContext";
import COLORS from "./src/constants/colors";

const Navigation = () => {
  const { userAuthenticated, isLoading, checkAuthStatus } = useUser();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  return <>{userAuthenticated ? <HomeNavigation /> : <AuthNavigation />}</>;
};

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <CategoryProvider>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </CategoryProvider>
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
  },
});
