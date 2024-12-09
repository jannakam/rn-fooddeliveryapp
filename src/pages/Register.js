import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/colors';
import { register } from '../api/auth';
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

const Register = () => {
  const navigation = useNavigation();
  const { updateUserState } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hadUsernameError, setHadUsernameError] = useState(false);
  const [hadPasswordError, setHadPasswordError] = useState(false);
  const [buttonError, setButtonError] = useState('');

  const isFormEmpty = !username || !password;

  // Reset button error when input changes
  useEffect(() => {
    if (buttonError) {
      setButtonError('');
    }
  }, [username, password]);

  // Timer to reset button error
  useEffect(() => {
    if (buttonError) {
      const timer = setTimeout(() => {
        setButtonError('');
      }, 3000); // Reset after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [buttonError]);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => register(username, password),
    onSuccess: (data) => {
      updateUserState(data);
    },
    onError: (error) => {
      if (error.message.includes('Username')) {
        setUsernameError(error.message);
        setHadUsernameError(true);
      } else if (error.message.includes('Password') || error.message.includes('password')) {
        setPasswordError(error.message);
        setHadPasswordError(true);
      } else if (error.message.includes('exists')) {
        setButtonError('Username already exists');
      } else {
        setButtonError('Registration failed');
      }
    },
  });

  const handleRegister = () => {
    let hasError = false;
    setUsernameError('');
    setPasswordError('');
    setButtonError('');
    
    if (!username) {
      setUsernameError('Username is required');
      setHadUsernameError(true);
      hasError = true;
    } else if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
      setHadUsernameError(true);
      hasError = true;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      setHadPasswordError(true);
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      setHadPasswordError(true);
      hasError = true;
    }
    
    if (!hasError) {
      mutate();
    }
  };

  const getButtonText = () => {
    if (isLoading) return 'Creating Account...';
    if (buttonError) return buttonError;
    if (isFormEmpty) return 'Enter credentials';
    return 'Register';
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
              <Text style={styles.title}>Sign Up!</Text>
              <Text style={styles.subtitle}>Create your new account</Text>
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
                onPress={handleRegister} 
                style={[
                  styles.button,
                  isLoading && styles.buttonDisabled,
                  buttonError && styles.buttonError,
                  isFormEmpty && styles.buttonEmpty
                ]}
                disabled={isLoading || isFormEmpty}
              >
                <Text style={[
                  styles.buttonText,
                  buttonError && styles.buttonErrorText
                ]}>
                  {isLoading ? 'Creating Account...' : 'Register'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.loginContainer}>
              <Text style={styles.loginPrompt}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

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
    marginBottom: 40,
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
  },
  buttonContainer: {
    width: '100%',
    marginTop: -5,
  },
  button: {
    backgroundColor: COLORS.SECONDARY,
    padding: 18,
    width: '100%',
    borderRadius: 12,
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
    backgroundColor: '#ff6b6b',
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  loginText: {
    color: COLORS.ACCENT,
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginPrompt: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
  loginContainer: {
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
