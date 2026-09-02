import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Counter(){
  const [count, setCount] = useState(0);

const clear = () => {
  setCount(0);
}

const increase = () => {
  setCount(count + 1);
};

const decrease = () => {
  if (count > 0) {
    setCount(count - 1);
  }
};
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>
      <Text style={styles.counter}>{count}</Text>

      <Button title="+" onPress={increase} />
      <Button title="-" onPress={decrease} />
      <Button title="Clear" onPress={clear} />
      </View>
  );    
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
  
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',

  
  },

  counter: {
    fontSize: 50,
    margin: 20,
  },
  });


