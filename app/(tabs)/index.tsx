
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [program, setProgram] = useState('');
  const [bio, setBio] = useState('');
  const [contact, setContact] = useState('');

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permission Required',
        'Please allow access to your photos to select a profile picture.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setSaved(false);
    }
  };

  const saveProfile = () => {
    setError('');
    setSaved(false);

    // Validate required information
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!program.trim()) {
      setError('Please enter your program.');
      return;
    }

    if (!contact.trim()) {
      setError('Please enter your contact information.');
      return;
    }

    
    setSaved(true);

    Alert.alert(
      'Profile Saved',
      'Your profile has been successfully saved!'
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Profile Generator
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Create and customize your personal profile
        </ThemedText>
      </ThemedView>

      
      <ThemedView style={styles.imageSection}>
        <Pressable
          onPress={pickImage}
          style={({ pressed }) => [
            styles.imageButton,
            pressed && styles.pressed,
          ]}
        >
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
              contentFit="cover"
            />
          ) : (
            <View style={styles.placeholder}>
              <ThemedText style={styles.cameraText}>📷</ThemedText>
              <ThemedText style={styles.placeholderText}>
                Add Photo
              </ThemedText>
            </View>
          )}
        </Pressable>

        <ThemedText style={styles.photoHint}>
          Tap the image to choose a profile photo
        </ThemedText>
      </ThemedView>

      {/* Form */}
      <ThemedView style={styles.form}>
        <ThemedText type="subtitle">Profile Information</ThemedText>

        {/* Full Name */}
        <View style={styles.field}>
          <ThemedText style={styles.label}>
            Full Name *
          </ThemedText>

          <TextInput
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              setSaved(false);
            }}
            placeholder="Enter your full name"
            placeholderTextColor="#888"
            style={styles.input}
          />
        </View>

        {/* Program */}
        <View style={styles.field}>
          <ThemedText style={styles.label}>
            Program *
          </ThemedText>

          <TextInput
            value={program}
            onChangeText={(text) => {
              setProgram(text);
              setSaved(false);
            }}
            placeholder="e.g. BS Information Technology"
            placeholderTextColor="#888"
            style={styles.input}
          />
        </View>

        {/* Biography */}
        <View style={styles.field}>
          <ThemedText style={styles.label}>
            Short Biography
          </ThemedText>

          <TextInput
            value={bio}
            onChangeText={(text) => {
              setBio(text);
              setSaved(false);
            }}
            placeholder="Tell us something about yourself..."
            placeholderTextColor="#888"
            style={[styles.input, styles.bioInput]}
            multiline
            maxLength={200}
          />

          <ThemedText style={styles.characterCount}>
            {bio.length}/200
          </ThemedText>
        </View>

        {/* Contact */}
        <View style={styles.field}>
          <ThemedText style={styles.label}>
            Contact Information *
          </ThemedText>

          <TextInput
            value={contact}
            onChangeText={(text) => {
              setContact(text);
              setSaved(false);
            }}
            placeholder="Email or phone number"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="email-address"
          />
        </View>

        
        {error ? (
          <View style={styles.errorBox}>
            <ThemedText style={styles.errorText}>
              ⚠️ {error}
            </ThemedText>
          </View>
        ) : null}

        
        <Pressable
          onPress={saveProfile}
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
          ]}
        >
          <ThemedText style={styles.saveButtonText}>
           Save Profile
          </ThemedText>
        </Pressable>
      </ThemedView>

      
      {saved && (
        <ThemedView style={styles.savedContainer}>
          <ThemedText type="subtitle" style={styles.savedTitle}>
            Profile Saved!
          </ThemedText>

          <View style={styles.profileCard}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.savedImage}
                contentFit="cover"
              />
            ) : (
              <View style={styles.savedImagePlaceholder}>
                <ThemedText style={{ fontSize: 30 }}>
                  
                </ThemedText>
              </View>
            )}

            <ThemedText type="title" style={styles.savedName}>
              {fullName}
            </ThemedText>

            <ThemedText style={styles.savedProgram}>
              🎓 {program}
            </ThemedText>

            {bio.trim() ? (
              <ThemedText style={styles.savedBio}>
                {bio}
              </ThemedText>
            ) : null}

            <View style={styles.contactBox}>
              <ThemedText style={styles.contactLabel}>
                Contact
              </ThemedText>

              <ThemedText style={styles.contactText}>
                 {contact}
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    textAlign: 'center',
    color: '#1d3557',
  },

  subtitle: {
    textAlign: 'center',
    color: '#667085',
    marginTop: 5,
  },

  imageSection: {
    alignItems: 'center',
    marginBottom: 25,
  },

  imageButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    backgroundColor: '#e8edf5',
  },

  profileImage: {
    width: '100%',
    height: '100%',
  },

  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cameraText: {
    fontSize: 32,
  },

  placeholderText: {
    marginTop: 5,
    color: '#667085',
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },

  photoHint: {
    marginTop: 8,
    fontSize: 12,
    color: '#667085',
    textAlign: 'center',
  },

  form: {
    gap: 5,
  },

  field: {
    marginTop: 15,
  },

  label: {
    fontWeight: '600',
    marginBottom: 7,
    color: '#344054',
  },

  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#101828',
  },

  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },

  characterCount: {
    textAlign: 'right',
    fontSize: 11,
    color: '#667085',
    marginTop: 3,
  },

  errorBox: {
    backgroundColor: '#fef3f2',
    borderRadius: 8,
    padding: 12,
    marginTop: 15,
  },

  errorText: {
    color: '#b42318',
  },

  saveButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },

  saveButtonPressed: {
    backgroundColor: '#1d4ed8',
    transform: [{ scale: 0.98 }],
  },

  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  savedContainer: {
    marginTop: 30,
  },

  savedTitle: {
    color: '#15803d',
    marginBottom: 12,
  },

  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  savedImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },

  savedImagePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#e8edf5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  savedName: {
    textAlign: 'center',
    color: '#1d3557',
  },

  savedProgram: {
    textAlign: 'center',
    marginTop: 5,
    color: '#475467',
  },

  savedBio: {
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 21,
    color: '#475467',
  },

  contactBox: {
    width: '100%',
    backgroundColor: '#f2f4f7',
    borderRadius: 10,
    padding: 12,
    marginTop: 18,
  },

  contactLabel: {
    fontWeight: '700',
    marginBottom: 4,
    color: '#344054',
  },

  contactText: {
    color: '#475467',
  },
});

