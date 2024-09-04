import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen({ onLogout }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    loadUsername();
  }, []);

  const loadUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('usuario');
      setUsername(storedUsername);
    } catch (error) {
      console.error('Erro ao carregar o nome de usuário', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage limpo.'); // Log para confirmar a limpeza do AsyncStorage
      onLogout();
    } catch (error) {
      console.error('Erro ao sair', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo de volta, {username}!</Text>
      <Image style={styles.logo} source={require('../assets/mestre.png')} />
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2f33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  logo: {
    height: 128,
    width: 128,
    marginBottom: 20,
  },
});
