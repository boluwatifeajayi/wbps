import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA02p5X11oGU0i7HpnOUPXllOdx6EqX0sw",
  authDomain: "wbps-4bd42.firebaseapp.com",
  projectId: "wbps-4bd42",
  storageBucket: "wbps-4bd42.appspot.com",
  messagingSenderId: "648875658462",
  appId: "1:648875658462:web:f32f7f4bfc416bb625c64f",
  measurementId: "G-LG4SXQF69Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, 'gs://wbps-4bd42.appspot.com')
const analytics = getAnalytics(app);

export default storage;
