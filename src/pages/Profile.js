import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    ScrollView, 
    ActivityIndicator, 
    Modal, 
    Pressable,
    Dimensions,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getProfile, logout } from '../api/auth';
import COLORS from '../constants/colors';
import { MaterialIcons } from "@expo/vector-icons";
import { useUser } from '../context/UserContext';

const Profile = () => {
    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const { setUserAuthenticated } = useUser();

    const addresses = [
        {
            id: 1,
            name: 'Home',
            street: '123 Al Salem Street',
            area: 'Salmiya',
            block: 'Block 12',
            building: 'Building 45',
        },
        {
            id: 2,
            name: 'Work',
            street: '456 Kuwait City Avenue',
            area: 'Sharq',
            block: 'Block 3',
            building: 'Tower 789',
        }
    ];

    const paymentMethods = [
        { id: 1, type: 'Visa', last4: '4242' },
        { id: 2, type: 'Mastercard', last4: '8888' }
    ];

    const avatarOptions = [
        require('../../assets/avatars/avatar1.png'),
        require('../../assets/avatars/avatar2.png'),
        require('../../assets/avatars/avatar3.png'),
        require('../../assets/avatars/avatar4.png'),
        require('../../assets/avatars/avatar5.png'),
        require('../../assets/avatars/avatar6.png'),
    ];

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await getProfile();
            setProfile(data);
        } catch (error) {
            console.error('Error loading profile:', error);
            if (error.message === 'Please login again') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Landing' }],
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setUserAuthenticated(false);
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
        }
    };

    const handleAvatarChange = async (newAvatar) => {
        try {
            // Get the URI of the selected avatar
            const newAvatarUri = Image.resolveAssetSource(newAvatar).uri;
            
            // Update the profile state with new image
            setProfile(prev => ({
                ...prev,
                image: newAvatarUri
            }));
            
            // Update selected avatar state
            setSelectedAvatar(newAvatarUri);
            
            // Close the modal
            setModalVisible(false);

            // Here you would typically make an API call to update the profile image
            // For example:
            // await updateProfileImage(newAvatarUri);
        } catch (error) {
            console.error('Error updating avatar:', error);
            Alert.alert('Error', 'Failed to update avatar');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.ACCENT} />
                <Text style={styles.loadingText}>Loading profile...</Text>
            </View>
        );
    }

    if (!profile) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Unable to load profile</Text>
                <TouchableOpacity style={styles.retryButton} onPress={loadProfile}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView 
                style={styles.container}
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header with Profile Image */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: profile?.image }}
                            style={styles.avatar}
                            defaultSource={require('../../assets/avatars/avatar1.png')}
                        />
                        <TouchableOpacity 
                            style={styles.editAvatarButton}
                            onPress={() => setModalVisible(true)}
                        >
                            <MaterialIcons name="edit" size={20} color={COLORS.WHITE} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.username}>{profile?.username}</Text>
                    <Text style={styles.points}>Points: {Math.floor(Math.random() * 1000)}</Text>
                </View>

                {/* User Details */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>User Details</Text>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{profile.username}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>janna@gmail.com</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Phone:</Text>
                        <Text style={styles.value}>+965 9449 9371</Text>
                    </View>
                </View>

                {/* Addresses */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Delivery Addresses</Text>
                        <View style={styles.headerButtons}>
                            <TouchableOpacity style={styles.addButton}>
                                <Text style={styles.editButtonText}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.editButtonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {addresses.map((address) => (
                        <View key={address.id} style={styles.addressCard}>
                            <Text style={styles.addressName}>{address.name}</Text>
                            <Text style={styles.addressText}>{address.street}</Text>
                            <Text style={styles.addressText}>{address.area}, {address.block}</Text>
                            <Text style={styles.addressText}>{address.building}</Text>
                        </View>
                    ))}
                </View>

                {/* Payment Methods */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Payment Methods</Text>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    {paymentMethods.map((method) => (
                        <View key={method.id} style={styles.paymentCard}>
                            <View style={styles.paymentInfo}>
                                <MaterialIcons 
                                    name={method.type.toLowerCase() === 'visa' ? 'credit-card' : 'credit-card'} 
                                    size={24} 
                                    color={COLORS.SECONDARY} 
                                />
                                <Text style={styles.value}>{method.type} **** {method.last4}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Order History Button */}
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('OrderHistory')}
                >
                    <Text style={styles.buttonText}>View Order History</Text>
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <MaterialIcons name="logout" size={20} color={COLORS.WHITE} />
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                statusBarTranslucent
            >
                <View style={styles.modalContainer}>
                    <Pressable 
                        style={styles.modalOverlay} 
                        onPress={() => setModalVisible(false)}
                    />
                    <View style={styles.modalContentWrapper}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Choose Avatar</Text>
                                <TouchableOpacity 
                                    onPress={() => setModalVisible(false)}
                                    style={styles.closeButton}
                                >
                                    <MaterialIcons name="close" size={24} color={COLORS.WHITE} />
                                </TouchableOpacity>
                            </View>
                            
                            <ScrollView 
                                contentContainerStyle={styles.avatarGridContainer}
                                showsVerticalScrollIndicator={false}
                            >
                                <View style={styles.avatarGrid}>
                                    {avatarOptions.map((avatar, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.avatarOption,
                                                selectedAvatar === Image.resolveAssetSource(avatar).uri && 
                                                styles.selectedAvatarOption
                                            ]}
                                            onPress={() => handleAvatarChange(avatar)}
                                        >
                                            <Image
                                                source={avatar}
                                                style={styles.avatarImage}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.PRIMARY,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.BACKGROUND,
    },
    loadingText: {
        color: COLORS.TEXT_SECONDARY,
        fontSize: 16,
        marginTop: 10,
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.PRIMARY,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.ACCENT,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.WHITE,
    },
    section: {
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: COLORS.SHADOW,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.PRIMARY,
    },
    editButton: {
        // paddingHorizontal: 12,
        // paddingVertical: 4,
        borderRadius: 5,
        backgroundColor: COLORS.BACKGROUND,
    },
    addButton: {
        // paddingHorizontal: 12,
        // paddingVertical: 4,
        borderRadius: 5,
        backgroundColor: COLORS.BACKGROUND,
    },
    editButtonText: {
        color: COLORS.ACCENT,
        fontSize: 14,
        fontWeight: '500',
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        color: COLORS.SECONDARY,
        fontWeight: "500",
    },
    value: {
        fontSize: 16,
        color: COLORS.SECONDARY,
    },
    addressCard: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 10,
        marginBottom: 10,
    },
    addressName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.PRIMARY,
        marginBottom: 5,
    },
    addressText: {
        fontSize: 14,
        color: COLORS.SECONDARY,
        marginBottom: 2,
    },
    paymentCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    paymentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    button: {
        marginHorizontal: 20,
        marginTop: 20,
        paddingVertical: 12,
        backgroundColor: COLORS.SECONDARY,
        borderRadius: 25,
        alignItems: "center",
    },
    buttonText: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: "500",
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.ACCENT,
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 40,
        padding: 12,
        borderRadius: 25,
        gap: 10,
    },
    logoutButtonText: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
    points: {
        fontSize: 14,
        color: COLORS.MUTED, 
        fontWeight: "500",
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentWrapper: {
        backgroundColor: COLORS.PRIMARY,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        maxHeight: '70%',
        minHeight: 300,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalContent: {
        flex: 1,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 10,
    },
    modalTitle: {
        color: COLORS.WHITE,
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 5,
    },
    avatarGridContainer: {
        flexGrow: 1,
    },
    avatarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
        paddingBottom: 20,
    },
    avatarOption: {
        padding: 5,
    },
    selectedAvatarOption: {
        transform: [{scale: 1.1}],
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
});

export default Profile;
