import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import COLORS from '../constants/colors';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Groceries at your fingertips',
    subtitle: 'Only the freshest handpicked groceries from local farmers',
    image: require('../../assets/landing/Screen1.png'),
  },
  {
    id: '2',
    title: 'Discover different cuisines!',
    subtitle: 'Travel the world from your home',
    image: require('../../assets/landing/Screen2.png'),
  },
  {
    id: '3',    
    title: 'The fastest delivery in town',
    subtitle: 'Get started and have your food delivered to your doorstep in under 30 minutes!',
    image: require('../../assets/landing/Screen3.png'),
  },
];

const Landing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const dotWidths = useRef(slides.map(() => new Animated.Value(6))).current;
  const scrollBeginOffset = useRef(0);

  useEffect(() => {
    // Animate all dots to their initial state
    slides.forEach((_, index) => {
      Animated.timing(dotWidths[index], {
        toValue: index === currentIndex ? 20 : 6,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [currentIndex]);

  const handleBeginDrag = (event) => {
    scrollBeginOffset.current = event.nativeEvent.contentOffset.x;
  };

  const handleEndDrag = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.x;
    const direction = currentOffset > scrollBeginOffset.current ? 'forward' : 'backward';
    
    // Prevent backward swipe on first screen
    if (currentIndex === 0 && direction === 'backward') {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      return;
    }
    
    // Prevent forward swipe on last screen
    if (currentIndex === slides.length - 1 && direction === 'forward') {
      flatListRef.current?.scrollToOffset({ 
        offset: width * (slides.length - 1), 
        animated: true 
      });
      return;
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <ImageBackground
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            {index === slides.length - 1 && (
              <View style={styles.logoContainer}>
                <ImageBackground
                  source={require('../../assets/logo2.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            )}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
            
            {index === slides.length - 1 && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
              >
                <Feather name="arrow-right" size={24} color={COLORS.WHITE} />
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderDots = () => {
    return (
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: dotWidths[index],
                backgroundColor: COLORS.WHITE,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== currentIndex && index >= 0 && index < slides.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollBeginDrag={handleBeginDrag}
        onScrollEndDrag={handleEndDrag}
        bounces={false}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  slide: {
    width,
    height,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    paddingBottom: 100,
  },
  textContainer: {
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.WHITE,
    textAlign: 'center',
    opacity: 0.8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    backgroundColor: COLORS.ACCENT,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default Landing; 