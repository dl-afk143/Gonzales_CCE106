import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Index() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');

  const validateInput = () => {
    if (num1.trim() === '' || num2.trim() === '') {
      setMessage('Please enter both numbers.');
      setResult('');
      return false;
    }

    if (isNaN(Number(num1)) || isNaN(Number(num2))) {
      setMessage('Please enter valid numeric values.');
      setResult('');
      return false;
    }

    setMessage('');
    return true;
  };

  const calculate = (operator: string) => {
    if (!validateInput()) return;

    const firstNumber = Number(num1);
    const secondNumber = Number(num2);

    if (operator === '/' && secondNumber === 0) {
      setMessage('Cannot divide by zero.');
      setResult('');
      return;
    }

    let answer = 0;

    switch (operator) {
      case '+':
        answer = firstNumber + secondNumber;
        break;

      case '-':
        answer = firstNumber - secondNumber;
        break;

      case '*':
        answer = firstNumber * secondNumber;
        break;

      case '/':
        answer = firstNumber / secondNumber;
        break;
    }

    setResult(answer.toString());
    setMessage('');
  };

  const clearCalculator = () => {
    setNum1('');
    setNum2('');
    setResult('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('+')}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('-')}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('*')}
        >
          <Text style={styles.buttonText}>×</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('/')}
        >
          <Text style={styles.buttonText}>÷</Text>
        </TouchableOpacity>
      </View>

      {message !== '' && (
        <Text style={styles.error}>{message}</Text>
      )}

      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>Result</Text>
        <Text style={styles.result}>{result || '0'}</Text>
      </View>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearCalculator}
      >
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    padding: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 15,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  button: {
    backgroundColor: '#007AFF',
    width: 65,
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },

  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },

  resultBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },

  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  result: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
  },

  clearButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },

  clearText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});