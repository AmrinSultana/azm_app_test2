import { initializeApp } from '@react-native-firebase/app';

// Optionally import the services that you want to use
//import '@react-native-firebase/auth';
//import '@react-native-firebase/firestore'; // If you're using Firestore

// Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDwOKbBsKywB-IukbYE1atG8cGiKAvpXGM',
    authDomain: 'azm-sales-inspector-baf39.firebaseapp.com',
    databaseURL: 'https://azm-sales-inspector-baf39.firebaseio.com',
    projectId: 'azm-sales-inspector-baf39',
    storageBucket: 'azm-sales-inspector-baf39.appspot.com',
    messagingSenderId: '291512952304',
    measurementId: 'G-8DTVD12HQC',
    appId: '1:291512952304:web:a3ec5c9629d37578d66935',
    region: 'asia-east2'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
