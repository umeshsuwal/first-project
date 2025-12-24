import Header from '@/components/Header';
import { spacing } from '@/constants/dimensions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ThemeOption = 'light' | 'dark' | 'auto';

const ThemeSettings = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('light');

  const themes: { value: ThemeOption; label: string; description: string; icon: string }[] = [
    {
      value: 'light',
      label: 'Light Mode',
      description: 'Classic bright theme',
      icon: 'white-balance-sunny',
    },
    {
      value: 'dark',
      label: 'Dark Mode',
      description: 'Easier on the eyes in low light',
      icon: 'moon-waning-crescent',
    },
    {
      value: 'auto',
      label: 'Auto',
      description: 'Matches your system settings',
      icon: 'theme-light-dark',
    },
  ];

  const handleThemeSelect = (theme: ThemeOption) => {
    setSelectedTheme(theme);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header title="Theme Settings" showBackButton={true} />
        
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Choose Your Theme</Text>
          <Text style={styles.sectionDescription}>
            Select the theme that works best for you
          </Text>

          {themes.map((theme) => (
            <TouchableOpacity
              key={theme.value}
              style={[
                styles.themeOption,
                selectedTheme === theme.value && styles.themeOptionActive,
              ]}
              onPress={() => handleThemeSelect(theme.value)}
            >
              <View style={styles.themeIconContainer}>
                <MaterialCommunityIcons
                  name={theme.icon as any}
                  size={32}
                  color={selectedTheme === theme.value ? '#9b6be0' : '#666'}
                />
              </View>
              <View style={styles.themeInfo}>
                <Text
                  style={[
                    styles.themeLabel,
                    selectedTheme === theme.value && styles.themeLabelActive,
                  ]}
                >
                  {theme.label}
                </Text>
                <Text style={styles.themeDescription}>{theme.description}</Text>
              </View>
              {selectedTheme === theme.value && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={24}
                  color="#9b6be0"
                />
              )}
            </TouchableOpacity>
          ))}

          <View style={styles.infoBox}>
            <MaterialCommunityIcons
              name="information-outline"
              size={20}
              color="#666"
            />
            <Text style={styles.infoText}>
              The Auto theme will automatically switch between light and dark modes
              based on your device's system settings.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThemeSettings;

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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d2d2d',
    marginBottom: spacing.xs,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: spacing.lg,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeOptionActive: {
    borderColor: '#9b6be0',
    backgroundColor: '#faf5ff',
  },
  themeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  themeInfo: {
    flex: 1,
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d2d2d',
    marginBottom: 4,
  },
  themeLabelActive: {
    color: '#9b6be0',
  },
  themeDescription: {
    fontSize: 13,
    color: '#666',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});
