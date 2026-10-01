import StudentCard, { type Student } from "@/components/StudentCard";
import { MOCK_STUDENTS } from "@/constants/mockStudents";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function StudentsScreen() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadStudents = async () => {
    setLoading(true);
    setError("");

    try {
      // Temporary mock data until the instructor provides the real API.
      await new Promise((resolve) => setTimeout(resolve, 500));

      setStudents(MOCK_STUDENTS);
    } catch (err) {
      setError("Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    (student.name ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>

      <TextInput
        style={styles.input}
        accessibilityLabel="Search students"
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator color="#245bb2" />
          <Text style={styles.text}>Loading students…</Text>
        </View>
      ) : error ? (
        <View style={styles.state} accessibilityLiveRegion="polite">
          <Text style={styles.error}>{error}</Text>

          <Pressable accessibilityRole="button" onPress={loadStudents}>
            <Text style={styles.link}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item, index) => String(item.id ?? index)}
          renderItem={({ item }) => <StudentCard student={item} />}
          ListEmptyComponent={
            <View style={styles.state}>
              <Text style={styles.text}>No students found.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f2f5fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#17324d",
    marginBottom: 20,
  },
  input: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#c6d2e1",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    color: "#17324d",
    marginBottom: 20,
  },
  state: {
    padding: 24,
    gap: 12,
    alignItems: "center",
  },
  text: {
    color: "#536579",
  },
  error: {
    color: "#b42318",
  },
  link: {
    color: "#245bb2",
    padding: 12,
  },
});
