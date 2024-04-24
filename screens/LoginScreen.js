// LoginScreen.js

import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
//import firebase from '@react-native-firebase/app';
import { app2,app1 } from "../screens/FirebaseConfig";
import auth from '@react-native-firebase/auth';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  /*
  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home', { email:userCredential.user.email });
    } catch (error) {
      setError(error.message);
    }
  };*/

  const handleLogin = async () => {
    try {
      const firebaseAuth = auth(app1);
      console.log('Firebase App instance:', app1);
      console.log('Firebase Auth instance:', auth(app1));
      const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
      console.log("user logged in successfully");
      navigation.navigate('Home', { email: userCredential.user.email });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const handleGoBack = () => {
    navigation.goBack();
  };



  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder='Email ID'
        onChangeText={(text) => setEmail(text)}
        keyboardType='email-address' />

      <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true} />

      <TouchableOpacity >
        <Text style={styles.forgotpassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.loginbtn} onPress={handleLogin}>
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.start} onPress={handleGoBack}>
        <Text style={styles.starttext}>Back {'<<'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  forgotpassword: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  loginbtn: {
    backgroundColor: '#0E21A0',
    padding: 10,
    width: 100,
    borderRadius: 5,
  },
  login: {
    color: 'white',
    textAlign: 'center',
  },
  start: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    padding: 10,
    borderRadius: 5,
  },
});

export default LoginScreen;
