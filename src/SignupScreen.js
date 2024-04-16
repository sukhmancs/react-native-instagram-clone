import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Image } from 'react-native';
import LoginForm from '../components/loginScreen/LoginForm';

// const LOGO = 'https://www.pngitem.com/pimgs/m/146-1468479_math-clipart-math-teacher-math-teacher-transparent-background.png';

const INSTAGRAM_LOGO = 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png';
const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleSignup = () => {
      // Check if fields are not blank and passwords match
      // Send HTTP request to /signup route
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={{uri: INSTAGRAM_LOGO, height: 100, width: 100}} />
        </View>   
        <LoginForm />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
});

export default SignupScreen;