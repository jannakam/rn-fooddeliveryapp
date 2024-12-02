import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, ScrollView, Image } from 'react-native';

export default function App() {
  return (
    <SafeAreaView 
	style={{
		flex: 1,
		backgroundColor: "#FFFFFF",
	}}>
	<ScrollView  
		style={{
			flex: 1,
			backgroundColor: "#FFFCF3",
			paddingHorizontal: 24,
		}}>
		<View 
			style={{
				width: 172,
				height: 251,
				backgroundColor: "#FFFFFF",
				borderRadius: 10,
				paddingTop: 41,
				paddingBottom: 60,
				marginTop: 103,
				shadowColor: "#0000001C",
				shadowOpacity: 0.1,
				shadowOffset: {
				    width: 0,
				    height: 2
				},
				shadowRadius: 6,
				elevation: 6,
			}}>
			<Image
				source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
				resizeMode = {"stretch"}
				style={{
					borderRadius: 100,
					height: 104,
					marginBottom: 26,
					marginHorizontal: 34,
				}}
			/>
			<Text 
				style={{
					color: "#000000",
					fontSize: 20,
					marginHorizontal: 57,
				}}>
				{"Italian"}
			</Text>
		</View>
	</ScrollView>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
