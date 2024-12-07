import { StyleSheet, Text, View, TextInput, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../App';
import COLORS from '../constants/colors';

const Register = () => {
  const navigation = useNavigation();

  const { setIsAuthenticated } = useAuth();

  const handleRegister = () => {
    // Simulate login process
    setIsAuthenticated(true); // Switch to HomeNavigation
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo_pink.png')} style={styles.logo} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Sign Up!</Text>
            <Text style={styles.subtitle}>Don't have an account? Register here</Text>
          </View>

          <TextInput style={styles.input} placeholder="Username" />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleRegister()} style={styles.button} title="Register">
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingVertical: 100,
  },
  logoContainer: {
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.PRIMARY,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.SECONDARY,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.BORDER_INPUT,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: COLORS.BACKGROUND_LIGHT_TRANSPARENT,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: COLORS.SECONDARY,
    color: COLORS.WHITE,
    padding: 15,
    width: '100%',
    textAlign: 'center',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  loginContainer: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: COLORS.ACCENT,
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 55,
    resizeMode: 'contain',
  },
});
