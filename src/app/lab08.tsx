
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AttendanceList() {
  const students = [
    { id: 1, name: "Juan Dela Cruz" },
    { id: 2, name: "Maria Santos" },
    { id: 3, name: "Pedro Reyes" },
    { id: 4, name: "Ana Garcia" },
    { id: 5, name: "Carlos Mendoza" },
    { id: 6, name: "Sofia Cruz" },
    { id: 7, name: "Mark Angelo" },
    { id: 8, name: "Angela Flores" },
  ];

  const [attendance, setAttendance] = useState<{
    [key: number]: "Present" | "Absent";
  }>({});

  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  useEffect(() => {
    const present = Object.values(attendance).filter(
      (status) => status === "Present"
    ).length;

    const absent = Object.values(attendance).filter(
      (status) => status === "Absent"
    ).length;

    setPresentCount(present);
    setAbsentCount(absent);
  }, [attendance]);

  const markAttendance = (
    studentId: number,
    status: "Present" | "Absent"
  ) => {
    setAttendance((previousAttendance) => ({
      ...previousAttendance,
      [studentId]: status,
    }));
  };

  const resetAttendance = () => {
    setAttendance({});
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Student Attendance List</Text>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Present</Text>
          <Text style={styles.presentNumber}>{presentCount}</Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Absent</Text>
          <Text style={styles.absentNumber}>{absentCount}</Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.totalNumber}>{students.length}</Text>
        </View>
      </View>

      {/* Attendance List */}
      <View style={styles.list}>
        {students.map((student) => {
          const status = attendance[student.id];

          return (
            <View key={student.id} style={styles.studentRow}>
              
              {/* Student Name + Checkbox */}
              <View style={styles.studentInfo}>
                <View
                  style={[
                    styles.checkbox,
                    status === "Present" && styles.checkboxPresent,
                  ]}
                >
                  {status === "Present" && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>

                <Text style={styles.studentName}>
                  {student.id}. {student.name}
                </Text>
              </View>

              {/* Buttons */}
              <View style={styles.buttons}>
                <Pressable
                  style={[
                    styles.presentButton,
                    status === "Present" && styles.selectedButton,
                  ]}
                  onPress={() =>
                    markAttendance(student.id, "Present")
                  }
                >
                  <Text style={styles.buttonText}>Present</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.absentButton,
                    status === "Absent" && styles.selectedButton,
                  ]}
                  onPress={() =>
                    markAttendance(student.id, "Absent")
                  }
                >
                  <Text style={styles.buttonText}>Absent</Text>
                </Pressable>
              </View>

              {/* Current Status */}
              <Text
                style={[
                  styles.status,
                  status === "Present"
                    ? styles.statusPresent
                    : status === "Absent"
                    ? styles.statusAbsent
                    : styles.statusNone,
                ]}
              >
                {status || "Not Marked"}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Reset Button */}
      <Pressable style={styles.resetButton} onPress={resetAttendance}>
        <Text style={styles.resetText}>Reset Attendance</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#222",
  },

  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  summaryBox: {
    backgroundColor: "white",
    width: "31%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },

  summaryLabel: {
    fontSize: 14,
    color: "#555",
  },

  presentNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#28a745",
    marginTop: 5,
  },

  absentNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dc3545",
    marginTop: 5,
  },

  totalNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },

  list: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },

  studentRow: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  studentInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  /* CHECKBOX */
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: "#aaa",
    borderRadius: 7,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  /* GREEN CHECKED BOX */
  checkboxPresent: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },

  /* CHECK LOGO */
  checkmark: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
    lineHeight: 23,
    textAlign: "center",
  },

  studentName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },

  buttons: {
    flexDirection: "row",
    gap: 10,
  },

  presentButton: {
    backgroundColor: "#28a745",
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 6,
  },

  absentButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 6,
  },

  selectedButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  status: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
  },

  statusPresent: {
    color: "#28a745",
  },

  statusAbsent: {
    color: "#dc3545",
  },

  statusNone: {
    color: "#777",
  },

  resetButton: {
    backgroundColor: "#333",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },

  resetText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

