import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDwOKbBsKywB-IukbYE1atG8cGiKAvpXGM",
    authDomain: "AZM Sales Inspector.firebaseapp.com",
    projectId: "azm-sales-inspector-baf39",
    storageBucket: "AZM Sales Inspector.appspot.com",
    messagingSenderId: "",
    appId: "1:291512952304:android:f98839219b7ac6b9d66935",
    databaseUrl: "https://azm-sales-inspector-baf39.firebaseio.com"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  export { firebase };