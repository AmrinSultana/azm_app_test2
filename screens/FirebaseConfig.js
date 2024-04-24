import {initializeApp,  getApps} from '@react-native-firebase/app';
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

const firebaseConfig2 = {
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

const apps = getApps();
const app1 = apps.length ? apps[0] : initializeApp(firebaseConfig2);
const app2 = apps.length ? apps[0] : initializeApp(firebaseConfig);
export {app2,app1};


/*
const firebaseConfig = {
  apiKey: "AIzaSyBXvv0D98z1oxFn4zqKtjzYcDAwsOvWjsI",
  authDomain: "azmapplogin.firebaseapp.com",
  projectId: "azmapplogin",
  storageBucket: "azmapplogin.appspot.com",
  messagingSenderId: "",
  appId: "1:352500037987:android:709e28739430461aeb7b56",
  databaseUrl: "https://azmapplogin.firebaseio.com"
};


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
*/
//const app1 = getApps().some(app => app.name === 'app1') ? getApp('app1') : initializeApp(firebaseConfig, 'app1');
//const app2 = getApps().some(app => app.name === 'app2') ? getApp('app2') : initializeApp(firebaseConfig2, 'app2');

//console.log('app2 initialized:', app2);
//console.log('app1 initialized:', app1);