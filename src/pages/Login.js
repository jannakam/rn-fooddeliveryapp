import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert, Animated } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/colors';
import { login } from '../api/auth';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '../context/UserContext';

const InputWithTooltip = ({ value, onChangeText, placeholder, secureTextEntry, error, hadError }) => {
  const tooltipOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error) {
      // Show tooltip
      Animated.sequence([
        Animated.timing(tooltipOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(5000), // Wait 5 seconds
        Animated.timing(tooltipOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error]);

  return (
    <View style={styles.inputWrapper}>
      <TextInput 
        style={[
          styles.input,
          error ? styles.inputError : null,
          hadError ? styles.inputWithError : null,
        ]} 
        placeholder={placeholder}
        placeholderTextColor={COLORS.MUTED}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      {error && (
        <Animated.View 
          style={[
            styles.tooltip,
            { opacity: tooltipOpacity }
          ]}
        >
          <Text style={styles.tooltipText}>{error}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const Login = () => {
  const navigation = useNavigation();
  const { updateUserState } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hadUsernameError, setHadUsernameError] = useState(false);
  const [hadPasswordError, setHadPasswordError] = useState(false);
  const [buttonError, setButtonError] = useState('');

  useEffect(() => {
    if (buttonError) {
      const timer = setTimeout(() => {
        setButtonError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [buttonError]);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => login(username, password),
    onSuccess: (data) => {
      updateUserState(data);
    },
    onError: (error) => {
      if (error.message.includes('Username')) {
        setUsernameError(error.message);
        setHadUsernameError(true);
        setButtonError('User not found');
      } else if (error.message.includes('password')) {
        setPasswordError(error.message);
        setHadPasswordError(true);
      } else {
        setButtonError(error.message);
      }
    },
  });

  const handleLogin = () => {
    let hasError = false;
    setUsernameError('');
    setPasswordError('');
    
    if (!username) {
      setUsernameError('Username is required');
      setHadUsernameError(true);
      hasError = true;
    }
    if (!password) {
      setPasswordError('Password is required');
      setHadPasswordError(true);
      hasError = true;
    }
    
    if (!hasError) {
      mutate();
    }
  };

  const isFormEmpty = !username || !password;

  const getButtonText = () => {
    if (isLoading) return 'Logging in...';
    if (buttonError) return buttonError;
    if (isFormEmpty) return 'Enter credentials';
    return 'Login';
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

            <InputWithTooltip 
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              error={usernameError}
              hadError={hadUsernameError}
            />

            <InputWithTooltip 
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
              error={passwordError}
              hadError={hadPasswordError}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                onPress={handleLogin} 
                style={[
                  styles.button, 
                  isLoading && styles.buttonDisabled,
                  buttonError && styles.buttonError,
                  isFormEmpty && styles.buttonEmpty
                ]}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {getButtonText()}
                </Text>
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
    paddingTop: 50,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  header: {
    marginBottom: 50,
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
  inputWrapper: {
    marginBottom: 35,
    width: '100%',
  },
  input: {
    width: '100%',
    zIndex: 2,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.BORDER_INPUT,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.WHITE,
  },
  inputError: {
    borderColor: COLORS.ACCENT,
  },
  inputWithError: {
    color: COLORS.ACCENT,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: COLORS.ACCENT,
    padding: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    top: -30,
    zIndex: 1,
    width: '100%',
    height: 40,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tooltipText: {
    color: COLORS.WHITE,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'OpenSans_400Regular',
  },
  buttonContainer: {
    width: '100%',
    marginTop: -5,
  },
  button: {
    backgroundColor: COLORS.SECONDARY,
    padding: 18,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    opacity: 0.8, // Default lower opacity
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonEmpty: {
    opacity: 0.3, // Even lower opacity when fields are empty
  },
  buttonError: {
    backgroundColor: COLORS.ACCENT,
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontFamily: 'OpenSans_700Bold',
  },
  registerText: {
    color: COLORS.ACCENT,
    fontFamily: 'OpenSans_700Bold',
    fontSize: 16,
  },
  registerPrompt: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: 'OpenSans_400Regular',
  },
  registerContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 150,
    height: 55,
    resizeMode: 'contain',
  },
});
