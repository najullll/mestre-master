import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUsername = await AsyncStorage.getItem('usuario');
      if (storedUsername) {
        setIsAuthenticated(true);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    isAuthenticated ? (
      <MainScreen onLogout={handleLogout} />
    ) : (
      <LoginScreen onLoginSuccess={handleLoginSuccess} />
    )
  );
}