import { Fragment, createContext, useContext, useState } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import Detail from "./src/pages/Detail";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import MenuItems from "./src/pages/MenuItems";
import Cart from "./src/pages/Cart";
import Restaurants from "./src/components/Restaurants";
import BottomNavbar from "./src/components/BottomNavbar";
import Header from "./src/components/Header";
import restaurants from "./src/data/restaurants";
import Categories from "./src/components/Categories";
import Home from "./src/pages/Home";
import Profile from "./src/pages/Profile";
import DiscoverPage from "./src/pages/DiscoverPage";
import AuthNavigation from "./src/navigation/AuthNav/AuthNavigation";
import HomeNavigation from "./src/navigation/HomeNav/HomeNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./src/context/CartContext";
import { CategoryProvider } from "./src/context/CategoryContext";

const AuthContext = createContext();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <CartProvider>
        <CategoryProvider>
          <NavigationContainer>
            {isAuthenticated ? <HomeNavigation /> : <AuthNavigation />}
          </NavigationContainer>
        </CategoryProvider>
      </CartProvider>
    </AuthContext.Provider>
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

export const useAuth = () => useContext(AuthContext);



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
