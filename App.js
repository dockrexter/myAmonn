import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/drawerNavigation';
import { useFonts } from "@use-expo/font";
// import stackNavigation from './src/navigation/stackNavigation';

const customFonts = {
  OpenSansCondensedBold: require("./assets/Fonts/OpenSansCondensed-Bold.ttf"),
  OpenSansCondensedLight: require("./assets/Fonts/OpenSansCondensed-Light.ttf"),
  OpenSansCondensedLightItalic:require("./assets/Fonts/OpenSansCondensed-LightItalic.ttf"),
};
export default function App() {
  const [isLoaded] = useFonts(customFonts);
  if (!isLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <DrawerNavigation/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
