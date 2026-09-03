import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Tabs } from 'expo-router';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome!</ThemedText>
      <ThemedText>Explore the app and get started.</ThemedText>
    </ThemedView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 2,
    padding: 40,
    gap: 16,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

  
  profileBox: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },

  profileText: {
    color: 'blue',
    fontSize: 20,
    textAlign: 'center',
  },

  exploreText: {
    fontFamily: 'Arial',
  },

  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});