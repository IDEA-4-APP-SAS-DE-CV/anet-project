import * as firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJNg8IpfaeL_LGJI93X8JNoHNx4Bp2l9Q",
  authDomain: "requisitions-contracts.firebaseapp.com",
  databaseURL: "https://requisitions-contracts-default-rtdb.firebaseio.com",
  projectId: "requisitions-contracts",
  storageBucket: "requisitions-contracts.appspot.com",
  messagingSenderId: "700057022119",
  appId: "1:700057022119:web:39a9457747bf217de3f582",
  measurementId: "G-2T06YFGB1W",
};

export const app = firebase.initializeApp(firebaseConfig);
