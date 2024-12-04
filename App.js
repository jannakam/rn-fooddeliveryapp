import { Fragment } from "react";
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

export default function App() {
  return (
    <Fragment>
      <SafeAreaView style={styles.safeAreaTop} />
      {/* This is to make the header and footer different colors */}
      <SafeAreaView style={styles.safeAreaBottom}>
        <View>
          <StatusBar barStyle={"light-content"} />
          <Header />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* <Detail menuItem={restaurants[0].menuItems[1]}/> */}
          <MenuItems restaurant={restaurants[0]} />
          {/* <Login /> */}
          {/* <Register /> */}
          {/* <Cart /> */}
		      {/* <Home /> */}
          {/* <Profile /> */}
          {/* <DiscoverPage /> */}
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
    backgroundColor: "#ae445a",
    flex: 1,
  },
});
