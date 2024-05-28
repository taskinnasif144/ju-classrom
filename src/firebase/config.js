// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK4QqJXoml8GOAZSTA89oIjWaRPplaW7c",
  authDomain: "ju-cls.firebaseapp.com",
  projectId: "ju-cls",
  storageBucket: "ju-cls.appspot.com",
  messagingSenderId: "991194429404",
  appId: "1:991194429404:web:67a569683d46adf3854119",
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export default firebase_app;
