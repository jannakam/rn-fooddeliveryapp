import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Dimensions, 
  Animated, 
  TouchableWithoutFeedback 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const OrderConfirmation = ({ route }) => {
  const { orderDetails } = route.params;
  const navigation = useNavigation();
  const slideAnim = new Animated.Value(height);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade in background
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Slide up content
    Animated.spring(slideAnim, {
      toValue: 0,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClose = () => {
    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeTab' }],
      });
    });
  };

  return (
    <View style={styles.container}>
      {/* Darkened background */}
      <Animated.View 
        style={[
          styles.backdrop, 
          { opacity: fadeAnim }
        ]}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.backdropTouch} />
        </TouchableWithoutFeedback>
      </Animated.View>

      {/* Content Card */}
      <Animated.View 
        style={[
          styles.contentCard,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            {/* <Icon name="check-circle" size={80} color={COLORS.ACCENT} /> */}
            <Icon5 name="thumbs-up" size={80} color={COLORS.ACCENT}/>
          </View>

          {/* Success Message */}
          <Text style={styles.title}>Order Confirmed!</Text>
          <Text style={styles.subtitle}>Thank you for your order</Text>

          {/* Order Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Order Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Order Number:</Text>
              <Text style={styles.detailValue}>{orderDetails.orderNumber}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Amount:</Text>
              <Text style={styles.detailValue}>{orderDetails.total.toFixed(2)} KWD</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Delivery Address:</Text>
              <Text style={styles.detailValue}>{orderDetails.address.slice(0, 20)}...</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Estimated Delivery:</Text>
              <Text style={styles.detailValue}>30-45 minutes</Text>
            </View>
          </View>

          {/* Back to Home Button */}
          <TouchableOpacity 
            style={styles.button}
            onPress={handleClose}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouch: {
    flex: 1,
  },
  contentCard: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: height * 0.5,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    alignItems: 'center',
    paddingTop: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'OpenSans_700Bold',
    color: COLORS.PRIMARY,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'OpenSans_400Regular',
    color: COLORS.SECONDARY,
    marginBottom: 30,
  },
  detailsContainer: {
    backgroundColor: COLORS.BACKGROUND_LIGHT_TRANSPARENT,
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 30,
  },
  detailsTitle: {
    fontSize: 18,
    fontFamily: 'OpenSans_700Bold',
    color: COLORS.PRIMARY,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'OpenSans_400Regular',
    color: COLORS.SECONDARY,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'OpenSans_600SemiBold',
    color: COLORS.PRIMARY,
  },
  button: {
    backgroundColor: COLORS.SECONDARY,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: 'OpenSans_700Bold',
  },
});

export default OrderConfirmation; 