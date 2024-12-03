import { Fragment } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
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

export default function App() {
  return (
    <Fragment>
      <SafeAreaView style={styles.safeAreaTop} />
      <SafeAreaView style={styles.safeAreaBottom}>
        {/* Top Safe Area */}
        <View>
          <StatusBar barStyle={"light-content"} />
          <Header />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* <Detail menuItem={restaurants[0].menuItems[0]}/> */}
          {/* <MenuItems restaurant={restaurants[0]} /> */}
          {/* <Categories /> */}
          {/* <Login /> */}
          {/* <Register /> */}
          {/* <Cart /> */}
		  <Home />
        </View>

        {/* Bottom Navbar */}
        <View>
          <BottomNavbar />
        </View>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  safeAreaTop: {
    backgroundColor: "darkslategrey",
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
    backgroundColor: "white",
    flex: 1,
  },
});
