import React, { useRef } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";


const LogoAnimation = ({navigation}) => {

  const handleStart  = () => {
    navigation.navigate('Login');
  };
  const fadeanim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(fadeanim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeanim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => fadeIn());
  };

  React.useEffect(() => {
    fadeIn();
    const interval = setInterval(() => {
      fadeOut();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      
      <View style={styles.logoContainer}>
        <Animated.Image
          source={require('../images/img2.png')}
          style={{ ...styles.logo, opacity: fadeanim }}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleStart}>
          <Text style={styles.btnText}>START &gt;&gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    margin: 'auto',
  },
  btnContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  btn: {
    padding: 10,
    borderRadius: 15,
    width: 100,
  },
  btnText: {
    color: '#000',
    textAlign: 'center', // Center the text horizontally within the button
    fontSize:14
  },
});

export default LogoAnimation;