

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Brightness from 'expo-brightness';


export default function App() {
  const [brightness, setBrightness] = useState(1); // Максимальна яскравість за замовчуванням

  useEffect(() => {
    // Функція для визначення рівня яскравості на основі часу доби
    const updateBrightnessBasedOnTime = async () => {
      const currentHour = new Date().getHours();

      let targetBrightness;

      if (currentHour >= 6 && currentHour < 18) {
        targetBrightness = 1; // Денна яскравість
      } else {
        targetBrightness = 0.3; // Нічна яскравість
      }

      await Brightness.setBrightnessAsync(targetBrightness);
      setBrightness(targetBrightness);
    };

    updateBrightnessBasedOnTime();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Поточний рівень яскравості: {brightness}</Text>
      <Button
        title="Зменшити яскравість"
        onPress={async () => {
          const newBrightness = brightness > 0.1 ? brightness - 0.1 : 0.1;
          await Brightness.setBrightnessAsync(newBrightness);
          setBrightness(newBrightness);
        }}
      />
      <Button
        title="Збільшити яскравість"
        onPress={async () => {
          const newBrightness = brightness < 1 ? brightness + 0.1 : 1;
          await Brightness.setBrightnessAsync(newBrightness);
          setBrightness(newBrightness);
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
