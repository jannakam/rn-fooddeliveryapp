import { StyleSheet, Text, View, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native';
import Detail from './src/pages/Detail';
import restaurants from './src/data/restaurants';
import Categories from './src/pages/Categories';
import Restaurants from './src/pages/Restaurants';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import MenuItems from './src/pages/MenuItems';

export default function App() {
  return (
    <View style={styles.container}>
		<StatusBar style="auto" />
		{/* <Detail menuItem={restaurants[0].menuItems[0]}/> */}
		{/* <Categories /> */}
		{/* <Restaurants /> */}
		<Login />
		{/* <Register /> */}
	</View>
  );
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex:1,
  	},
});
