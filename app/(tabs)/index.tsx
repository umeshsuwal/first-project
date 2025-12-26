import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Header from "../../components/Header";
import { spacing } from "../../constants/dimensions";

const QUICK_ACTIONS = [
  { id: "tools", title: "Tools", icon: "hammer-outline", route: "/tools" },
  { id: "converter", title: "Converter", icon: "swap-vertical-outline", route: "/tools" },
  { id: "scanner", title: "Scanner", icon: "scan-outline", route: "/tools" },
  { id: "profile", title: "Profile", icon: "person-outline", route: "/profile" },
] as const;

const RECENT = [
  { id: "1", title: "Image Resizer", image: require("../../assets/images/icon.png") },
  { id: "2", title: "Theme Settings", image: require("../../assets/images/react-logo.png") },
  { id: "3", title: "Personal Info", image: require("../../assets/images/profile-img.png") },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="MyTools" />

      <View style={styles.hero}>
        <View style={styles.heroText}>
          <Text style={styles.heroTitle}>Utilities for everyday tasks</Text>
          <Text style={styles.heroSubtitle}>Fast, lightweight tools at your fingertips</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/tools") }>
            <Text style={styles.primaryButtonText}>Open Tools</Text>
          </TouchableOpacity>
        </View>
        <Image source={require("../../assets/images/partial-react-logo.png")} style={styles.heroImage} />
      </View>

      <View style={styles.gridCard}>
        {QUICK_ACTIONS.map((a) => (
          <TouchableOpacity
            key={a.id}
            style={styles.gridItem}
            onPress={() => router.push(a.route)}
          >
            <View style={styles.gridIconWrap}>
              <Ionicons name={a.icon as any} size={24} color="#0f172a" />
            </View>
            <Text style={styles.gridText}>{a.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent</Text>
        <FlatList
          data={RECENT}
          keyExtractor={(it) => it.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.recentCard} onPress={() => {}}>
              <Image source={item.image} style={styles.recentImage} />
              <Text style={styles.recentLabel}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  hero: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  heroText: { flex: 1, paddingRight: spacing.md },
  heroTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  heroSubtitle: { color: "#c7d2fe", marginTop: 6 },
  heroImage: { width: 72, height: 72, opacity: 0.95 },
  primaryButton: {
    marginTop: spacing.md,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  primaryButtonText: { color: "#0f172a", fontWeight: "700" },

  gridCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: "center",
  },
  gridIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#eef2ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  gridText: { fontWeight: "600", color: "#0f172a" },

  card: {
    backgroundColor: "#fff",
  },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: spacing.sm },

  recentCard: {
    width: 120,
    marginRight: spacing.sm,
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: spacing.sm,
    borderRadius: 10,
  },
  recentImage: { width: 64, height: 64, borderRadius: 8, marginBottom: spacing.sm },
  recentLabel: { fontWeight: "600", textAlign: "center" },
  tipText: { color: "#0f172a", lineHeight: 20 },
});
