import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { register } from '../api/auth';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/Feather';
import { useUser } from '../context/UserContext';

const avatarOptions = [
    require('../../assets/avatars/avatar1.png'),
    require('../../assets/avatars/avatar2.png'),
    require('../../assets/avatars/avatar3.png'),
    require('../../assets/avatars/avatar4.png'),
    require('../../assets/avatars/avatar5.png'),
    require('../../assets/avatars/avatar6.png'),
];

const AvatarSelection = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { username, password } = route.params;
    const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
    const [isLoading, setIsLoading] = useState(false);
    const { setUserAuthenticated } = useUser();

    const handleRegister = async () => {
        try {
            setIsLoading(true);
            const selectedAvatarPath = Image.resolveAssetSource(selectedAvatar).uri;
            const response = await register(username, password, selectedAvatarPath);
            
            // If registration is successful, set user as authenticated
            if (response && response.token) {
                setUserAuthenticated(true);
            } else {
                Alert.alert('Error', 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error registering:', error);
            Alert.alert(
                'Registration Failed',
                error.message || 'An error occurred during registration',
                [{ text: 'OK' }]
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <Icon name="arrow-left" size={24} color={COLORS.WHITE} style={styles.backButton} />
            <View 
                contentContainerStyle={styles.container}
                style={styles.scrollView}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Choose Your Avatar</Text>
                    <Text style={styles.subtitle}>Select a profile picture for your account</Text>
                    
                    <View style={styles.avatarGrid}>
                        {avatarOptions.map((avatar, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.avatarContainer}
                                onPress={() => setSelectedAvatar(avatar)}
                            >
                                <Image
                                    source={avatar}
                                    style={[
                                        styles.avatar,
                                        selectedAvatar === avatar && styles.selectedAvatar
                                    ]}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    
                    <TouchableOpacity 
                        style={[styles.button, isLoading && styles.buttonDisabled]}
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        <Text style={styles.buttonText}>
                            {isLoading ? 'Creating Account...' : 'Complete Registration'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.PRIMARY,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        minHeight: '100%',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 32,
        fontFamily: 'OpenSans_700Bold',
        marginBottom: 10,
        color: COLORS.WHITE,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: COLORS.MUTED,
        marginBottom: 40,
        textAlign: 'center',
        fontFamily: 'OpenSans_400Regular',
    },
    avatarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        marginBottom: 40,
        paddingHorizontal: 10,
    },
    avatarContainer: {
        margin: 5,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        opacity: 0.7,
    },
    selectedAvatar: {
        opacity: 1,
        transform: [{scale: 1.1}],
    },
    button: {
        backgroundColor: COLORS.ACCENT,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
    },
    backButton: {
        position: 'absolute',
        top: 80,
        left: 30,
        backgroundColor: COLORS.ACCENT,
        borderRadius: 100,
        padding: 10,
    },
});

export default AvatarSelection; 