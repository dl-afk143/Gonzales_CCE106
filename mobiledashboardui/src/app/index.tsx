import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function MetricCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricDescription}>{description}</Text>
    </View>
  );
}

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.subtitle}>Welcome back!</Text>
          </View>

          <Pressable style={styles.profileButton}>
            <Text style={styles.profileText}>👤</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Overview</Text>

        <View style={styles.metricsContainer}>
          <MetricCard
            title="Students"
            value="120"
            description="Total students"
          />

          <MetricCard title="Tasks" value="24" description="Active tasks" />

          <MetricCard title="Attendance" value="92%" description="This month" />
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionsContainer}>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionIcon}>＋</Text>
            <Text style={styles.actionText}>Add Task</Text>
          </Pressable>

          <Pressable style={styles.actionButton}>
            <Text style={styles.actionIcon}>✓</Text>
            <Text style={styles.actionText}>View Tasks</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Recent Activity</Text>

        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>✓</Text>

            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Assignment submitted</Text>
              <Text style={styles.activityTime}>10 minutes ago</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>👤</Text>

            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New student added</Text>
              <Text style={styles.activityTime}>1 hour ago</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>✓</Text>

            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Task completed</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1F2937",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 4,
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    fontSize: 22,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 14,
    marginTop: 8,
  },

  metricsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },

  metricCard: {
    flex: 1,
    minWidth: "30%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },

  metricTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },

  metricValue: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2563EB",
    marginTop: 8,
  },

  metricDescription: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
  },

  actionsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  actionButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    elevation: 2,
  },

  actionIcon: {
    fontSize: 24,
    color: "#2563EB",
    marginBottom: 6,
  },

  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },

  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },

  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    marginRight: 12,
  },

  activityContent: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },

  activityTime: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 6,
  },
});
