// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0Vl2ZC9zX7tysAYLZI0TlJKS1mp6pZFU",
  authDomain: "react-crud-a5c4d.firebaseapp.com",
  projectId: "react-crud-a5c4d",
  storageBucket: "react-crud-a5c4d.appspot.com",
  messagingSenderId: "833219439897",
  appId: "1:833219439897:web:2c049aff19a79f6541e988"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;