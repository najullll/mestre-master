import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('usuario');
      const storedPassword = await AsyncStorage.getItem('senha');
      console.log('Dados recuperados:', storedUsername, storedPassword);  // Log dos dados recuperados

      if (username === storedUsername && password === storedPassword) {
        setMessage(`Bem-vindo, ${username}!`);
        onLoginSuccess();
      } else {
        setMessage('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  const handleRegister = async () => {
    try {
      await AsyncStorage.setItem('usuario', username);
      await AsyncStorage.setItem('senha', password);
      console.log('Dados salvos:', username, password);  // Log dos dados salvos
      setMessage('Registro bem-sucedido! Faça o login.');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Erro ao registrar', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apoio ao Mestre de RPG</Text>
      <Image style={styles.logo} source={require('../assets/mestre.png')} />
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={handleLogin} />
        <Button title="Registrar" onPress={handleRegister} />
      </View>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2f33',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7289da',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#7289da',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: 250,
    color: '#fff',
    backgroundColor: '#23272a',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
  },
  message: {
    marginTop: 20,
    color: '#f04747',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
    marginBottom: 20,
  },
});
