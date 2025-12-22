import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import { iconSize, spacing } from '@/constants/dimensions';

import { Feather } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
        <Header />
        <View style={styles.profileImageContainer}>
            <Image source={require('@/assets/images/profile-img.png')} style={styles.profileImage} />
            <TouchableOpacity style={styles.editIconContainer}>
                <Feather name="edit-3" size={iconSize.sm} color="white" />
            </TouchableOpacity>
        </View>
        <View style={styles.nameRoleContainer}>
            <Text style={styles.name}>Umesh Suwal</Text>
            <Text style={styles.role}>Frontend Developer</Text>
        </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.md, 
    },
    profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    profileImage: {
        height: 200,
        width: 200,

    },
    editIconContainer: {
        height: 30,
        width: 30,
        backgroundColor: 'orange',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -65,
        marginLeft: 55,
    },
    nameRoleContainer: {
        alignItems: 'center',
        marginVertical: spacing.sm,
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
    },
    role: {
        fontSize: 16,
        color: 'gray',
    },
});