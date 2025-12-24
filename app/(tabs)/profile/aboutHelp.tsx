import Header from '@/components/Header';
import { spacing } from '@/constants/dimensions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AboutHelp = () => {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const helpItems = [
    {
      icon: 'book-open-outline',
      title: 'User Guide',
      description: 'Learn how to use all features',
      action: () => {},
    },
    {
      icon: 'frequently-asked-questions',
      title: 'FAQ',
      description: 'Frequently asked questions',
      action: () => {},
    },
    {
      icon: 'email-outline',
      title: 'Contact Support',
      description: 'Get help from our support team',
      action: () => handleLinkPress('mailto:support@example.com'),
    },
    {
      icon: 'message-text-outline',
      title: 'Send Feedback',
      description: 'Share your thoughts and suggestions',
      action: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header title="About & Help" showBackButton={true} />
        
        <View style={styles.contentContainer}>
          <View style={styles.appInfoContainer}>
            <MaterialCommunityIcons name="application" size={64} color="#9b6be0" />
            <Text style={styles.appName}>Test App</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
            <Text style={styles.description}>
              This app is currently on testing.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Help & Support</Text>
          {helpItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.helpItem}
              onPress={item.action}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={24}
                  color="#9b6be0"
                />
              </View>
              <View style={styles.helpInfo}>
                <Text style={styles.helpTitle}>{item.title}</Text>
                <Text style={styles.helpDescription}>{item.description}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          ))}

          <Text style={styles.sectionTitle}>Legal</Text>
          <TouchableOpacity
            style={styles.legalItem}
            onPress={() => {}}
          >
            <Text style={styles.legalText}>Privacy Policy</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#999"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.legalItem}
            onPress={() => {}}
          >
            <Text style={styles.legalText}>Terms of Service</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#999"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.legalItem}
            onPress={() => {}}
          >
            <Text style={styles.legalText}>Open Source Licenses</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#999"
            />
          </TouchableOpacity>

          <Text style={styles.footer}>
            Made with ❤️ by Umesh Suwal{'\n'}
            © 2025 All rights reserved
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutHelp;

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
  appInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d2d2d',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  version: {
    fontSize: 14,
    color: '#666',
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d2d2d',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#faf5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  helpInfo: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d2d2d',
    marginBottom: 4,
  },
  helpDescription: {
    fontSize: 13,
    color: '#666',
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  legalText: {
    fontSize: 16,
    color: '#2d2d2d',
    fontWeight: '500',
  },
  footer: {
    textAlign: 'center',
    fontSize: 13,
    color: '#999',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
});
