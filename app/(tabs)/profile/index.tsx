import Header from '@/components/Header';
import { spacing } from '@/constants/dimensions';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Header title="Profile" showBackButton={true} />
        
        <View style={styles.profileImageContainer}>
            <View style={styles.profileImageWrapper}>
                <Image 
                    source={require('@/assets/images/icon.png')} 
                    style={styles.profileImage} 
                />
            </View>
        </View>

        <View style={styles.nameEmailContainer}>
            <Text style={styles.name}>Umesh Suwal</Text>
            <Text style={styles.email}>mail@umeshsuwal.com.np</Text>
        </View>

        <View style={styles.statsContainer}>
            <View style={styles.statItem}>
                <View style={styles.iconWrapper}>
                    <MaterialCommunityIcons name="walk" size={24} color="#ff6b9d" />
                </View>
                <Text style={styles.statValue}>8,432</Text>
                <Text style={styles.statLabel}>Steps</Text>
            </View>

            <View style={styles.statItem}>
                <View style={styles.iconWrapper}>
                    <MaterialCommunityIcons name="heart-pulse" size={24} color="#ff6b9d" />
                </View>
                <Text style={styles.statValue}>120 bpm</Text>
                <Text style={styles.statLabel}>Heart rate</Text>
            </View>

            <View style={styles.statItem}>
                <View style={styles.iconWrapper}>
                    <MaterialCommunityIcons name="map-marker-distance" size={24} color="#ff6b9d" />
                </View>
                <Text style={styles.statValue}>5.2 km</Text>
                <Text style={styles.statLabel}>Distance</Text>
            </View>
        </View>

        <View style={styles.menuContainer}>
            <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => router.push('/(tabs)/profile/personalInfoSettings')}
            >
                <View style={styles.menuLeft}>
                    <MaterialCommunityIcons name="account-cog-outline" size={24} color="#333" />
                    <Text style={styles.menuText}>Personal settings</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => router.push('/(tabs)/profile/notificationSettings')}
            >
                <View style={styles.menuLeft}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color="#333" />
                    <Text style={styles.menuText}>Notification Settings</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => router.push('/(tabs)/profile/theme')}
            >
                <View style={styles.menuLeft}>
                    <MaterialCommunityIcons name="theme-light-dark" size={24} color="#333" />
                    <Text style={styles.menuText}>Theme (Light/Dark/Auto)</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                    <MaterialCommunityIcons name="export" size={24} color="#333" />
                    <Text style={styles.menuText}>Export Data</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => router.push('/(tabs)/profile/aboutHelp')}
            >
                <View style={styles.menuLeft}>
                    <MaterialCommunityIcons name="information-outline" size={24} color="#333" />
                    <Text style={styles.menuText}>About & Help</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fef5f8',
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: spacing.md,
    },
    profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.sm,
        marginBottom: spacing.sm,
    },
    profileImageWrapper: {
        position: 'relative',
        padding: spacing.xs,
        backgroundColor: 'white',
        borderRadius: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 5,
    },
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
    },
    nameEmailContainer: {
        alignItems: 'center',
        marginTop: spacing.lg,
        marginBottom: spacing.lg,
    },
    name: {
        fontSize: 26,
        fontWeight: '700',
        color: '#2d2d2d',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: spacing.lg,
        marginBottom: spacing.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#ffe9f2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2d2d2d',
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    menuContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    menuText: {
        fontSize: 16,
        color: '#2d2d2d',
        fontWeight: '500',
    },
});