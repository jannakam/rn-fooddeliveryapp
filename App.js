import { Fragment, createContext, useContext, useState } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import AuthNavigation from "./src/navigation/AuthNav/AuthNavigation";
import HomeNavigation from "./src/navigation/HomeNav/HomeNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./src/context/CartContext";
import { CategoryProvider } from "./src/context/CategoryContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider, useUser } from "./src/context/UserContext";


export default function App() {
  const queryClient = new QueryClient();

  const Navigation = () => {
    const { userAuthenticated } = useUser();
  
    return <>{userAuthenticated ? <HomeNavigation /> : <AuthNavigation />}</>;
  };

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
  safeAreaTop: {
    backgroundColor: "#442e54",
    flex: 0,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 18,
  },
  safeAreaBottom: {
    backgroundColor: "#442e54",
    flex: 1,
  },
});

// <Fragment>
//   <SafeAreaView style={styles.safeAreaTop} />
//   <SafeAreaView style={styles.safeAreaBottom}>
//     <View>
//       <StatusBar barStyle={"light-content"} />
//       <Header />
//     </View>

//     <View style={styles.content}>
//       {/* <Detail menuItem={restaurants[0].menuItems[0]}/> */}
//       {/* <Home /> */}
//       {/* <Profile /> */}
//       {/* <DiscoverPage /> */}
//     </View>

//     <View>
//       <BottomNavbar />
//     </View>
//   </SafeAreaView>
// </Fragment>
