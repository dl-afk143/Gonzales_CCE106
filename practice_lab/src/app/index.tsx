import { Link } from "expo-router";
import { ScrollView, StyleSheet, View, } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function DashboardScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">
        Studyhoy
      </ThemedText>

      <ThemedText style={styles.welcome}>
        Welcome back, Dwayne!
      </ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Dashboard
      </ThemedText>

      <View style={styles.cardContainer}>
        <ThemedView style={styles.card}>
          <ThemedText type="small">
            Total Tasks
          </ThemedText>

          <ThemedText type="title">
            10
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="small">
            Completed
          </ThemedText>

          <ThemedText type="title">
            6
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="small">
            Pending
          </ThemedText>

          <ThemedText type="title">
            4
          </ThemedText>
        </ThemedView>
      </View>

      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Quick Access
      </ThemedText>

      <Link href="/tasks" style={styles.link}>
        View My Tasks
      </Link>

      <Link href="/profile" style={styles.link}>
        View Profile
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  welcome: {
    marginTop: 6,
  },

  sectionTitle: {
    marginTop: 30,
    marginBottom: 15,
  },

  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  card: {
    flex: 1,
    minWidth: 100,
    padding: 18,
    borderRadius: 15,
  },

  link: {
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 16,
  },
});