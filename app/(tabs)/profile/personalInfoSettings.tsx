import Header from '@/components/Header';
import { spacing } from '@/constants/dimensions';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PersonalInfoSettings = () => {
  const [name, setName] = useState('Umesh Suwal');
  const [email, setEmail] = useState('mail@umeshsuwal.com.np');
  const [phone, setPhone] = useState('+977 9876543210');
  const [dateOfBirth, setDateOfBirth] = useState('01/01/1990');
  const [gender, setGender] = useState('Male');

  const handleSave = () => {
    // TODO: implement API call
  };

  const handleEditPhoto = () => {
    // TODO: add image picker
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header title="Personal Information" showBackButton={true} />
        
        <View style={styles.contentContainer}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImageWrapper}>
              <Image 
                source={require('@/assets/images/icon.png')} 
                style={styles.profileImage} 
              />
              <TouchableOpacity style={styles.editIconContainer} onPress={handleEditPhoto}>
                <Feather name="edit-3" size={14} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleEditPhoto}>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholder="DD/MM/YYYY"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              {['Male', 'Female', 'Other'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.genderButton,
                    gender === option && styles.genderButtonActive,
                  ]}
                  onPress={() => setGender(option)}
                >
                  <Text
                    style={[
                      styles.genderText,
                      gender === option && styles.genderTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInfoSettings;

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
    marginBottom: spacing.xl,
  },
  profileImageWrapper: {
    position: 'relative',
    padding: spacing.xs,
    backgroundColor: 'white',
    borderRadius: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: spacing.sm,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  editIconContainer: {
    height: 36,
    width: 36,
    backgroundColor: '#9b6be0',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 2,
    right: 2,
    borderWidth: 4,
    borderColor: 'white',
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9b6be0',
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d2d2d',
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  genderButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#9b6be0',
    borderColor: '#9b6be0',
  },
  genderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  genderTextActive: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#9b6be0',
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
