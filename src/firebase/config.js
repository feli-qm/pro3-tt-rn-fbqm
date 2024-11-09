import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDjtHEv2vVYvzp56E8tVIXc4lHwSOqEnJo",
    authDomain: "pro3-tt-rn-fbqm.firebaseapp.com",
    projectId: "pro3-tt-rn-fbqm",
    storageBucket: "pro3-tt-rn-fbqm.firebasestorage.app",
    messagingSenderId: "1077320916540",
    appId: "1:1077320916540:web:3967503f17560d3c592d39"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();