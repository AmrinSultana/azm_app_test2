import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

const HomeScreen = ({ route }) => {
  const { email } = route.params;
  const navigation = useNavigation();
  const [isCameraEnabled, setCameraEnabled] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const toggleCamera = () => {
    setCameraEnabled((prevIsCameraEnabled) => {
      const newStartTime = prevIsCameraEnabled ? null : new Date();
      setStartTime(newStartTime);
      return !prevIsCameraEnabled;
    });
  };

  useEffect(() => {
    if (isCameraEnabled) {

      //console.log("Before navigation - isCameraEnabled:", isCameraEnabled, "startTime:", startTime);
      navigation.navigate('Camera', { isCameraEnabled, startTime, toggleCamera });
      //console.log("After navigation - isCameraEnabled:", isCameraEnabled, "startTime:", startTime);

      Toast.show({
        type: 'success',
        text1: 'Attendance Started',
      });
    } else {
      Toast.show({
        type: 'info',
        text1: 'Attendance Stopped',
      });
    }
  }, [isCameraEnabled, navigation, startTime]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text>Email: {email}</Text>
        <Switch
          value={isCameraEnabled}
          onValueChange={toggleCamera}
          style={styles.toggle}
        />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  toggle: {
    marginVertical: 10,
  },
});

export default HomeScreen;
