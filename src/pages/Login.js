import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../App';
import COLORS from '../constants/colors';

const Login = () => {
  const navigation = useNavigation();

  const { setIsAuthenticated } = useAuth();

  const handleLogin = () => {
    // Simulate login process
    setIsAuthenticated(true); // Switch to HomeNavigation
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo_pink.png')} style={styles.logo} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>Login to your Account</Text>
            </View>

            <TextInput 
              style={styles.input} 
              placeholder="Username" 
              placeholderTextColor={COLORS.MUTED}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Password" 
              placeholderTextColor={COLORS.MUTED}
              secureTextEntry 
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerPrompt}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  keyboardAvoid: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 100,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.WHITE,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.MUTED,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.BORDER_INPUT,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: COLORS.WHITE,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 5,
  },
  button: {
    backgroundColor: COLORS.SECONDARY,
    padding: 18,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  registerText: {
    color: COLORS.ACCENT,
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerPrompt: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
  registerContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 200,
    height: 55,
    resizeMode: 'contain',
  },
});
