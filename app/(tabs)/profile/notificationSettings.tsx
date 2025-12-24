import Header from '@/components/Header';
import { spacing } from '@/constants/dimensions';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationSettings = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [activityReminders, setActivityReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [achievementAlerts, setAchievementAlerts] = useState(true);
  const [socialUpdates, setSocialUpdates] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header title="Notification Settings" showBackButton={true} />
        
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive push notifications on your device
              </Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#e0e0e0', true: '#c9a7f5' }}
              thumbColor={pushNotifications ? '#9b6be0' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Email Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive notifications via email
              </Text>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#e0e0e0', true: '#c9a7f5' }}
              thumbColor={emailNotifications ? '#9b6be0' : '#f4f3f4'}
            />
          </View>

          <Text style={styles.sectionTitle}>Activity</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Activity Reminders</Text>
              <Text style={styles.settingDescription}>
                Get reminders to stay active throughout the day
              </Text>
            </View>
            <Switch
              value={activityReminders}
              onValueChange={setActivityReminders}
              trackColor={{ false: '#e0e0e0', true: '#c9a7f5' }}
              thumbColor={activityReminders ? '#9b6be0' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Weekly Reports</Text>
              <Text style={styles.settingDescription}>
                Receive weekly summary of your activity
              </Text>
            </View>
            <Switch
              value={weeklyReports}
              onValueChange={setWeeklyReports}
              trackColor={{ false: '#e0e0e0', true: '#c9a7f5' }}
              thumbColor={weeklyReports ? '#9b6be0' : '#f4f3f4'}
            />
          </View>

          <Text style={styles.sectionTitle}>Updates</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Achievement Alerts</Text>
              <Text style={styles.settingDescription}>
                Get notified when you reach milestones
              </Text>
            </View>
            <Switch
              value={achievementAlerts}
              onValueChange={setAchievementAlerts}
              trackColor={{ false: '#e0e0e0', true: '#c9a7f5' }}
              thumbColor={achievementAlerts ? '#9b6be0' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Social Updates</Text>
              <Text style={styles.settingDescription}>
                Notifications about friends and community
              </Text>
            </View>
            <Switch
              value={socialUpdates}
              onValueChange={setSocialUpdates}
              trackColor={{ false: '#e0e0e0', true: '#c9a7f5' }}
              thumbColor={socialUpdates ? '#9b6be0' : '#f4f3f4'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationSettings;

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
    fontSize: 18,
    fontWeight: '700',
    color: '#2d2d2d',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d2d2d',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
  },
});
