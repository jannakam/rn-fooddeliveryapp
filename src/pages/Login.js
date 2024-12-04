import { StyleSheet, Text, View, TextInput, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../App';
  

const Login = () => {
  const navigation = useNavigation();

  const { setIsAuthenticated } = useAuth();

  const handleLogin = () => {
    // Simulate login process
    setIsAuthenticated(true); // Switch to HomeNavigation
  };

  return (
    // <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to your Account</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Username" />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleLogin()} style={styles.button} title="Login">
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('Register')}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
        </View>
      </View>
    // </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#442e54',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#4b4376',
    color: 'white',
    padding: 15,
    width: '100%',
    textAlign: 'center',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  registerText: {
    color: '#ae445a',
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
