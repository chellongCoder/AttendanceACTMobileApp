import RNFirebase from 'react-native-firebase';
// import * as firebase from "firebase";
import { Platform } from 'react-native';
const configurationOptions = {
    debug: true
};
const androidConfig = {
    clientId: "91025224695-eovabr4tpcql5v0hp1ahbiv17d4s2cf4.apps.googleusercontent.com",
    appId: "1:91025224695:android:987cb78dfbeb1d3d",
    apiKey: "AIzaSyA9oBWtsR9CKNOYcwwfJl6Wr6s4ifV7dNE",
    databaseURL: "https://fbloginwithfirebaseexamp-68b34.firebaseio.com/",
    storageBucket: "fbloginwithfirebaseexamp-68b34.appspot.com",
    messagingSenderId: "91025224695",
    projectId: "fbloginwithfirebaseexamp-68b34",
    // enable persistence by adding the below flag
    persistence: true
};
const iosConfig = {
    clientId: '91025224695-ll0ors05v4t9g34msjjfksencesm13a9.apps.googleusercontent.com',
    appId: '1:91025224695:ios:8cf1066ec2bbbc60',
    apiKey: 'AIzaSyD7WzmydgNiHERzdAhCb_lS7t7rLPzj3JQ',
    databaseURL: 'https://fbloginwithfirebaseexamp-68b34.firebaseio.com/',
    storageBucket: 'fbloginwithfirebaseexamp-68b34.appspot.com',
    messagingSenderId: '91025224695',
    projectId: 'fbloginwithfirebaseexamp-68b34',
    // enable persistence by adding the below flag
    persistence: true,
};
const firebase = RNFirebase.initializeApp(
// use platform specific firebase config
Platform.OS === 'ios' ? iosConfig : androidConfig, 
// name of this app
'AttendanceACT');
export default firebase;
//# sourceMappingURL=firebase.js.map