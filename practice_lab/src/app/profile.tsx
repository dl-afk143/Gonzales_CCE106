import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ProfileScreen() {
  const [name, setName] = useState("Dwayne");
  const [email, setEmail] = useState("dwayne@example.com");
  const [message, setMessage] = useState("");

  const saveProfile = () => {
    if (name.trim() === "" || email.trim() === "") {
      setMessage("Please complete all fields.");
      return;
    }

    setMessage("Profile saved successfully!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">
        Profile
      </ThemedText>

      <ThemedText style={styles.subtitle}>
        Manage your student information
      </ThemedText>

      <ThemedView style={styles.card}>
        <ThemedText type="small">
          Name
        </ThemedText>

        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter your name"
        />

        <ThemedText type="small">
          Email
        </ThemedText>

        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Pressable
          style={styles.saveButton}
          onPress={saveProfile}
        >
          <ThemedText>
            Save Profile
          </ThemedText>
        </Pressable>

        {message !== "" && (
          <ThemedText style={styles.message}>
            {message}
          </ThemedText>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 20,
  },

  card: {
    padding: 20,
    borderRadius: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    marginBottom: 18,
    fontSize: 16,
  },

  saveButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#800000",
    alignItems: "center",
  },

  message: {
    marginTop: 15,
  },
});