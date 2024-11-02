import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0); // У метрах
  const [calories, setCalories] = useState(0); // У калоріях

  // Середня довжина кроку в метрах (для розрахунку пройденої відстані)
  const averageStepLength = 0.78;

  useEffect(() => {
    let stepCounter = 0;
    Accelerometer.setUpdateInterval(1000);

    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      const totalAcceleration = Math.sqrt(
        accelerometerData.x ** 2 + accelerometerData.y ** 2 + accelerometerData.z ** 2
      );

      // Умовне значення для кроку: перевищення порогу прискорення
      if (totalAcceleration > 1.2) {
        stepCounter += 1;
        setSteps(prevSteps => prevSteps + 1);

        // Оновлення відстані та калорій
        const newDistance = stepCounter * averageStepLength;
        setDistance(newDistance);
        setCalories(newDistance * 0.05); // Кількість калорій на основі пройденої відстані
      }
    });

    return () => subscription && subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Фітнес-трекер</Text>
      <Text style={styles.text}>Кількість кроків: {steps}</Text>
      <Text style={styles.text}>Пройдена відстань: {distance.toFixed(2)} м</Text>
      <Text style={styles.text}>Спалені калорії: {calories.toFixed(2)} ккал</Text>
      <Button title="Скинути дані" onPress={() => {
        setSteps(0);
        setDistance(0);
        setCalories(0);
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
