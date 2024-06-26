import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Modal, TextInput } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import '@react-native-firebase/firestore';
import { app2,app1} from "../screens/FirebaseConfig";
import { Card } from "react-native-elements";
import Dropdown from 'react-native-element-dropdown';
import { SelectList } from "react-native-dropdown-select-list";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { GeoPoint, getDocs, collection, query, where } from '@react-native-firebase/firestore';
import * as geolib from 'geolib';

//import { getCurrentPosition } from "geolocation";




const Checkin = ({ route }) => {

  const { isCameraEnabled, startTime, toggleCamera } = route.params;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState('');
  const [selected, selected2] = useState([]);
  const [userLocation, setUserLocation] = useState([]);
  const [nearbyplaces, setnearbyPlaces] = useState([]);
  const [selectedplaces, setselectedplaces] = useState([]);
  const [reason, setSelectedReason] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [checkoutText, setCheckoutText] = useState('');
  const navigation = useNavigation(''); null
  /*
    const checkFirebaseConnection = async () => {
      try {
        const snapshot = await firebase.firestore().collection('geofences').get();
        if (snapshot.empty) {
          console.log('No documents found!');
        } else {
          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
          });
          return snapshot.docs.map(doc => doc.data()); 
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };*/

  /*
   useEffect(() => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log(latitude,longitude)
          setCurrentLocation({ latitude, longitude });
        },
        error => {
          if (error.code === 1) {
            console.error("Error getting current location: Permission denied");
          } else if (error.code === 2) {
            console.error("Error getting current location: Position unavailable");
          } else if (error.code === 3) {
            console.error("Error getting current location: Location request timed out");
          } else {
            console.error("Error getting current location:", error.message);
          }
        },
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
      );
    }, []);
    useEffect(() => {
      const fetchPlaces = async () => {
        if (currentLocation) {
          const { latitude, longitude } = currentLocation;
          const radius = 0.00050; // Approximately 30 meters
          const lowerBound = new GeoPoint(latitude - radius, longitude - radius);
          const upperBound = new GeoPoint(latitude + radius, longitude + radius);
  
          console.log("LowerBound:", lowerBound);
          console.log("UpperBound:", upperBound);
  
          const geofencesRef = collection(app2.firestore(), "geofences");
          try {
            const querySnapshot = await getDocs(
              query(geofencesRef,
                where("location", ">=", lowerBound),
                where("location", "<=", upperBound)
              )
            );
  
            const items = querySnapshot.docs.map(doc => ({
              label: doc.data().name.replace(/\"/g, ""),
              value: doc.data().name.replace(/\"/g, ""),
              id: doc.id
            }));
  
            console.log("Fetched places nearby:", items);
            setSelectedplaces(items);
          } catch (error) {
            console.error("Error fetching places nearby:", error);
            setSelectedplaces([]); // Ensure always setting an array even on error
          }
        }
      };
  
      fetchPlaces();
    }, [currentLocation]); 
  
  
    useEffect(() => {
      const fetchPlaces = async () => {
        if (currentLocation) {
          const { latitude, longitude } = currentLocation;
          const geofencesRef = collection(app2.firestore(), "geofences");
  
          try {
            const querySnapshot = await getDocs(geofencesRef);
            console.log("Number of places:", querySnapshot.size)
            const items = [];
  
            querySnapshot.forEach(doc => {
              const place = doc.data();
              console.log("Place:", place);
              const placeLocation = place.location;
              const distance = calculateDistance(latitude, longitude, placeLocation.latitude, placeLocation.longitude);
              
              console.log("Distance to place:", distance);
  
              const maxDistance = 3000; 
              if (distance <= maxDistance) {
                items.push({
                  label: place.name.replace(/\"/g, ""),
                  value: place.name.replace(/\"/g, ""),
                  id: doc.id
                });
              }
            });
            console.log("Number of nearby places:", items.length);
            console.log("Fetched places nearby:", items);
            setSelectedplaces(items);
          } catch (error) {
            console.error("Error fetching places nearby:", error);
            setSelectedplaces([]); 
          }
        }
      };
  
      fetchPlaces();
    }, [currentLocation]);
  
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371e3; // metres
      const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;
  
      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      const d = R * c; // in metres
      return d;
    }; */
  useEffect(() => {
    // Get user's current location
    const getLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => console.error(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    const locationWatcher = Geolocation.watchPosition(
      getLocation,
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    return () => {
      console.log(Geolocation.clearWatch(locationWatcher));
    };
  }, []);



  //console.log(geolib);
  useEffect(() => {
    if (userLocation) {
      // Query Firestore for nearby places
      const placesRef = collection(app2.firestore(), "geofencetest");
      placesRef
        .get()
        .then(querySnapshot => {
          const nearby = [];
          querySnapshot.forEach(doc => {
            const place = doc.data();
            console.log("Place:", place);
            const distance = geolib.getDistance(
              { latitude: userLocation.latitude, longitude: userLocation.longitude },
              { latitude: place.latitude, longitude: place.longitude }
            );
            console.log("Distance:", distance);
            if (distance < 500) { // Distance less than 5 km (adjust as needed)
              nearby.push(place);
            }
          });
          setnearbyPlaces(nearby);
        })
        //.catch(error => console.error('Error getting documents: ', error));
    }
  }, [userLocation]);

  /*
    useEffect(() => {
      const fetchPlaces = async () => {
        const geofencesRef = collection(app2.firestore(), "geofencetest");
  
        try {
          const querySnapshot = await geofencesRef.get();
          console.log("Total documents fetched:", querySnapshot.docs.length);
          const items = querySnapshot.docs.map(doc => ({
            label: doc.data().name.replace(/\"/g, ""),
            value: doc.data().name.replace(/\"/g, ""),
            id: doc.id
          }));
  
          console.log("Fetched places:", items);
          setPlaces(items);
        } catch (error) {
          console.error("Error fetching places:", error);
        }
      };
  
      fetchPlaces();
    }, []);*/

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };
   //enable button only after places and reason selected
  useEffect(() => {
    setIsButtonEnabled(selected !== null && selected2 !== null);
  }, [selected, selected2]);

  const handleCheckout = () => {
    setCheckoutModalVisible(true);
  };

  const handleCheckoutConfirm = () => {
    setCheckoutModalVisible(false);
  };


  const navigateToAnotherScreen = () => {
    if (isButtonEnabled) {
      handleCheckout();
    }
  };


  useEffect(() => {
    let intervalId;

    if (isCameraEnabled && startTime) {
      intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isCameraEnabled, startTime]);

  useEffect(() => {
    console.log("Checkin - isCameraEnabled:", isCameraEnabled, "startTime:", startTime);
  }, [startTime]);

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  const formattedStartTime = startTime ? startTime.toLocaleString("en-US", options) : "";
  const formattedTime = currentTime.toLocaleString("en-US", options);
  const runningTime = getRunningTime(startTime, currentTime);

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.attendanceContainer}>
          <Text style={styles.attendanceText}>Attendance: </Text>
          <Switch
            value={isCameraEnabled}
            onValueChange={toggleCamera}
            style={styles.toggle}
          />
        </View>
        {isCameraEnabled && startTime && (
          <>
            <View style={styles.rowContainer1}>
              <Text style={styles.subTitle}>Attendance started at:</Text>
              <Text style={styles.timeText}>{formattedStartTime}</Text>
            </View>
            <View style={styles.rowContainer2}>
              <Text style={styles.durationText}> Attendance Duration: {runningTime}</Text>
            </View>
            <View style={{ marginTop: 25 }}>
            <Text>Select Location:</Text>
              <Picker
                selectedValue={selectedplaces}
                onValueChange={(itemValue, itemIndex) => setselectedplaces(itemValue)}>
                
                {nearbyplaces.map(place => (
                  <Picker.Item key={place.id} label={place.name} value={place.id} />
                ))}
              </Picker>
            </View>
            <View style={{ marginTop: 25 }}>
              <Text>Select a reason:</Text>
              <Picker
                selectedValue={reason}
                onValueChange={(itemValue, itemIndex) => setSelectedReason(itemValue)}>
                <Picker.Item label="Attendance" value="Attendance" />
                {/* Add more options here if needed */}
              </Picker>
            </View>
          </>
        )}
      </Card>

      <View style={[styles.btnContainer, { opacity: isButtonEnabled ? 1 : 0 }]}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: isButtonEnabled ? 'green' : 'gray' }]}
          onPress={navigateToAnotherScreen}
          disabled={!isButtonEnabled}
        >
          <Text style={styles.btnText}>Checkin {'>>'}</Text>
        </TouchableOpacity>
      </View>


      <Modal
        animationType="fade"
        transparent={true}
        visible={checkoutModalVisible}
        onRequestClose={() => {
          setCheckoutModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Card containerStyle={styles.modalCard}>
            <Text style={styles.modalText}>Are you sure you want to check out?</Text>
            <TextInput
              style={styles.input}
              placeholder="Comments on your Visit"
              value={checkoutText}
              onChangeText={text => setCheckoutText(text)}
            />
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckoutConfirm}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

const getRunningTime = (startTime, currentTime) => {
  if (!startTime) {
    return "00:00:00";
  }

  const diffInSeconds = Math.floor((currentTime - startTime) / 1000);
  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  card: {
    width: '95%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  attendanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  attendanceText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20
  },
  toggle: {
    marginRight: "40%",
  },
  rowContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },

  rowContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  subTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  durationText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  btn: {
    padding: 10,
    borderRadius: 15,
    width: 100,
    backgroundColor: 'green'
  },
  btnText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 14
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  checkoutButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,

  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    alignItems: 'center',
  },
});

export default Checkin;
