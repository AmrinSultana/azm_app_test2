import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyBXvv0D98z1oxFn4zqKtjzYcDAwsOvWjsI",
    authDomain: "azmapplogin.firebaseapp.com", 
    projectId: "azmapplogin",
    storageBucket: "azmapplogin.appspot.com",
    messagingSenderId: "", 
    appId: "1:352500037987:android:709e28739430461aeb7b56",
    databaseUrl: "https://azmapplogin.firebaseio.com"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase};