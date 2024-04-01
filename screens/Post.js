import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, Animated, ToastAndroid } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
//import { firebase} from '../screens/FirebaseConfig';
//import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import { firebase } from '../screens/FirebaseConfig';
import Geolocation from '@react-native-community/geolocation';

const PostScreen = () => {
  const [text, setText] = useState('');
  //const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [buttonOpacity] = useState(new Animated.Value(1));
  const [selected, setSelected] = useState(null);

  const data = [
    { key: '1', value: 'Faheel' },
    { key: '2', value: 'Farwaniya' },
    { key: '3', value: 'Kuwait City' },
  ]

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = () => {
    Geolocation.requestAuthorization();
  };

  const handleLocationChange = (value) => {
    setSelected(value);
    if (typeof value === 'string' && value !== '') {
      getLocationCoordinates(value);
      
    } else {
      setLatitude(null);
      setLongitude(null);
    }
  };
  const getLocationCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('Received position:', position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        console.error('Error getting location:', error);
        Alert.alert('Location Permission Denied', 'Please enable location permissions to use this feature.');
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };


  const addPostToFirestore = async () => {
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      await firebase.firestore().collection('post').add({
        text,
        selected,
        latitude,
        longitude,
        timestamp,
      });
      console.log('Post added to Firestore');
      showToast("Post added");
      setText('');
      setSelected('');
      setLatitude(null);
      setLongitude(null);
    } catch (error) {
      console.error('Error adding post to Firestore:', error);
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Text"
        value={text}
        onChangeText={setText}
      />

      <View style={styles.selectlist}>
        <SelectList
          data={data.map(item => item.value)} 
          setSelected={handleLocationChange} 
          placeholder="Select Place"
        />
      </View>

      <Animated.View style={[styles.buttonContainer, { opacity: buttonOpacity }]}>
        <TouchableOpacity onPress={addPostToFirestore}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  selectlist:
  {
    width: '80%',
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
export default PostScreen;
