import React from 'react';
import { View, StyleSheet, Text, Dimensions, StatusBar, SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get('window');

const SemiCircularView = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <StatusBar backgroundColor="pink" barStyle="light-content" translucent={true} />
      <View style={styles.semiCircle}>
        <Text style={styles.text}>Content Here</Text>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default SemiCircularView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'brown',
  },
  semiCircle: {
    width: width,
    height: height * 0.5, 
    backgroundColor: 'brown',
    borderBottomLeftRadius: width*.3, 
    borderBottomRightRadius: width*.3, 
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    justifyContent: 'center', 
    alignItems: 'center',    
  },
  text: {
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 20,
  },
});
