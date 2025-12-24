import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="personalInfoSettings" />
      <Stack.Screen name="notificationSettings" />
      <Stack.Screen name="theme" />
      <Stack.Screen name="aboutHelp" />
    </Stack>
  );
}
