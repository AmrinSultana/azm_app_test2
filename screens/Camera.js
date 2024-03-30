import React, { useRef } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import { RNCamera } from "react-native-camera";
import { request, PERMISSIONS } from "react-native-permissions";
import { useNavigation, useRoute } from "@react-navigation/native";
//import firebaseConfig from "../screens/FirebaseConfig";
//import {firebase as FirebaseApp} from '@react-native-firebase/app';
//import { firebase as FirebaseStorage } from "@react-native-firebase/storage";


const Camera = ({ route }) => {
    const camref = useRef(null);
    const navigation = useNavigation('');
    const { params } = useRoute();
    const { isCameraEnabled, startTime, toggleCamera } = route.params;

    /*
    if (!FirebaseApp.apps.length) {
        FirebaseApp.initializeApp(firebaseConfig);
    }*/

    const requestpermission = async () => {

        try {
            let permissions;
            if (Platform.OS === "android") {
                permissions = PERMISSIONS.ANDROID.CAMERA;
            }
            else if (Platform.OS === "ios") {
                permissions = PERMISSIONS.IOS.CAMERA;
            }
            else {
                console.log("Unsupported OS");
                return false;
            }

            const result = await request(permissions);
            return result === 'granted';
        } catch (error) {
            console.log("Error granting permisions", error);
            return false;
        }

    }


    const takePicture = async () => {
        if (camref.current) {
            const hasPermission = await requestpermission();
            if (!hasPermission) {
                console.warn('Camera permission denied');
                return;
            }

            try {
                const options = { quality: 0.5, base64: true };
                const data = await camref.current.takePictureAsync(options);
                console.log('Picture taken:', data.uri);

                const currentdate = new Date();
                const date = currentdate.getDate();
                const month = currentdate.getMonth() + 1;
                const year = currentdate.getFullYear();
                const time = currentdate.toLocaleTimeString();

                /*
                const imageFileName = `${year}-${month}-${date}_${time}.jpg`; 
                const folderPath = 'images'; 
                const storageRef = FirebaseStorage.storage().ref().child(folderPath).child(imageFileName);
                const response = await fetch(data.uri);
                const blob = await response.blob();
                await storageRef.put(blob);

                console.log('Image uploaded successfully'); */

                navigation.navigate('Checkin', { isCameraEnabled, startTime, toggleCamera });



            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };



    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                ref={camref}
                style={{ flex: 1 }}
                type={RNCamera.Constants.Type.front}
                captureAudio={false} />

            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={takePicture} style={{ padding: 15, borderRadius: 10, backgroundColor: 'Grey' }}>
                    <Text style={{ fontSize: 20, marginBottom: 10, color: '#4CAF50' }}>UPLOAD</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default Camera;