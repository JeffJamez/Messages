import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB25v7ctVdLu621wEDNWDvDPX2lHHja4AY",
    authDomain: "imessage-10615.firebaseapp.com",
    databaseURL: "https://imessage-10615.firebaseio.com",
    projectId: "imessage-10615",
    storageBucket: "imessage-10615.appspot.com",
    messagingSenderId: "441929991602",
    appId: "1:441929991602:web:e3c24835d6f2c64efc90ab",
    measurementId: "G-TWLVR7PBLP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider}
export default db
