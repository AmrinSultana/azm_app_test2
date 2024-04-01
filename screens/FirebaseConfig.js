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

/*
const firebaseConfig2 = {
  apiKey: "AIzaSyDwOKbBsKywB-IukbYE1atG8cGiKAvpXGM",
  authDomain: "AZM Sales Inspector.firebaseapp.com",
  projectId: "azm-sales-inspector-baf39",
  storageBucket: "AZM Sales Inspector.appspot.com",
  messagingSenderId: "",
  appId: "1:291512952304:android:f98839219b7ac6b9d66935",
  databaseUrl: "https://azm-sales-inspector-baf39.firebaseio.com"

};
let app1, app2, firestore1, firestore2;

if (!firebase.apps.length) { 
  app1 = firebase.initializeApp(firebaseConfig1, 'app1');
  app2 = firebase.initializeApp(firebaseConfig2, 'app2');
} else {
  app1 = firebase.app('app1');
  app2 = firebase.app('app2');
}

firestore1 = app1.firestore();
firestore2 = app2.firestore();*/
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase};